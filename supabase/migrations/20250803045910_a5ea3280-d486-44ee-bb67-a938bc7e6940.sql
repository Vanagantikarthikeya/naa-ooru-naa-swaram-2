-- Create custom types
CREATE TYPE public.app_role AS ENUM ('admin', 'user');
CREATE TYPE public.contribution_type AS ENUM ('story', 'image', 'audio', 'video');

-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  total_contributions INTEGER DEFAULT 0,
  total_likes_received INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Create contributions table
CREATE TABLE public.contributions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  type contribution_type NOT NULL DEFAULT 'story',
  image_url TEXT,
  audio_url TEXT,
  video_url TEXT,
  location TEXT,
  tags TEXT[],
  is_featured BOOLEAN DEFAULT FALSE,
  like_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  share_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create likes table
CREATE TABLE public.likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  contribution_id UUID NOT NULL REFERENCES public.contributions(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, contribution_id)
);

-- Create comments table
CREATE TABLE public.comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  contribution_id UUID NOT NULL REFERENCES public.contributions(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create saves table (for bookmarking contributions)
CREATE TABLE public.saves (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  contribution_id UUID NOT NULL REFERENCES public.contributions(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, contribution_id)
);

-- Create analytics table for admin dashboard
CREATE TABLE public.analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  event_data JSONB,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saves ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT public.has_role(_user_id, 'admin'::app_role)
$$;

-- Create function to get user profile
CREATE OR REPLACE FUNCTION public.get_user_profile(_user_id UUID)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  email TEXT,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  total_contributions INTEGER,
  total_likes_received INTEGER,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT 
    p.id,
    p.user_id,
    p.email,
    p.display_name,
    p.avatar_url,
    p.bio,
    p.total_contributions,
    p.total_likes_received,
    p.created_at,
    p.updated_at
  FROM public.profiles p
  WHERE p.user_id = _user_id
$$;

-- RLS Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can update any profile"
ON public.profiles FOR UPDATE
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete any profile"
ON public.profiles FOR DELETE
USING (public.is_admin(auth.uid()));

-- RLS Policies for user_roles
CREATE POLICY "Roles are viewable by admins and self"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id OR public.is_admin(auth.uid()));

CREATE POLICY "Only admins can manage roles"
ON public.user_roles FOR ALL
USING (public.is_admin(auth.uid()));

-- RLS Policies for contributions
CREATE POLICY "Contributions are viewable by everyone"
ON public.contributions FOR SELECT USING (true);

CREATE POLICY "Users can create their own contributions"
ON public.contributions FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own contributions"
ON public.contributions FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own contributions"
ON public.contributions FOR DELETE
USING (auth.uid() = user_id);

CREATE POLICY "Admins can delete any contribution"
ON public.contributions FOR DELETE
USING (public.is_admin(auth.uid()));

-- RLS Policies for likes
CREATE POLICY "Likes are viewable by everyone"
ON public.likes FOR SELECT USING (true);

CREATE POLICY "Users can manage their own likes"
ON public.likes FOR ALL
USING (auth.uid() = user_id);

-- RLS Policies for comments
CREATE POLICY "Comments are viewable by everyone"
ON public.comments FOR SELECT USING (true);

CREATE POLICY "Users can create comments"
ON public.comments FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments"
ON public.comments FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments"
ON public.comments FOR DELETE
USING (auth.uid() = user_id);

CREATE POLICY "Admins can delete any comment"
ON public.comments FOR DELETE
USING (public.is_admin(auth.uid()));

-- RLS Policies for saves
CREATE POLICY "Users can view their own saves"
ON public.saves FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own saves"
ON public.saves FOR ALL
USING (auth.uid() = user_id);

-- RLS Policies for analytics
CREATE POLICY "Only admins can view analytics"
ON public.analytics FOR SELECT
USING (public.is_admin(auth.uid()));

CREATE POLICY "Anyone can insert analytics"
ON public.analytics FOR INSERT
WITH CHECK (true);

-- Create functions for updating counts
CREATE OR REPLACE FUNCTION public.update_contribution_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Update like count
    IF TG_TABLE_NAME = 'likes' THEN
      UPDATE public.contributions 
      SET like_count = like_count + 1
      WHERE id = NEW.contribution_id;
      
      -- Update user's total likes received
      UPDATE public.profiles 
      SET total_likes_received = total_likes_received + 1
      WHERE user_id = (SELECT user_id FROM public.contributions WHERE id = NEW.contribution_id);
    END IF;
    
    -- Update comment count
    IF TG_TABLE_NAME = 'comments' THEN
      UPDATE public.contributions 
      SET comment_count = comment_count + 1
      WHERE id = NEW.contribution_id;
    END IF;
    
    RETURN NEW;
  END IF;
  
  IF TG_OP = 'DELETE' THEN
    -- Update like count
    IF TG_TABLE_NAME = 'likes' THEN
      UPDATE public.contributions 
      SET like_count = like_count - 1
      WHERE id = OLD.contribution_id;
      
      -- Update user's total likes received
      UPDATE public.profiles 
      SET total_likes_received = total_likes_received - 1
      WHERE user_id = (SELECT user_id FROM public.contributions WHERE id = OLD.contribution_id);
    END IF;
    
    -- Update comment count
    IF TG_TABLE_NAME = 'comments' THEN
      UPDATE public.contributions 
      SET comment_count = comment_count - 1
      WHERE id = OLD.contribution_id;
    END IF;
    
    RETURN OLD;
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for count updates
CREATE TRIGGER update_like_counts
  AFTER INSERT OR DELETE ON public.likes
  FOR EACH ROW EXECUTE FUNCTION public.update_contribution_counts();

CREATE TRIGGER update_comment_counts
  AFTER INSERT OR DELETE ON public.comments
  FOR EACH ROW EXECUTE FUNCTION public.update_contribution_counts();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Create profile
  INSERT INTO public.profiles (user_id, email, display_name)
  VALUES (
    NEW.id, 
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email)
  );
  
  -- Assign role (admin for specific email, user for others)
  INSERT INTO public.user_roles (user_id, role)
  VALUES (
    NEW.id,
    CASE 
      WHEN NEW.email = 'vanagantikarthik@gmail.com' THEN 'admin'::app_role
      ELSE 'user'::app_role
    END
  );
  
  -- Track analytics
  INSERT INTO public.analytics (event_type, event_data, user_id)
  VALUES ('user_signup', jsonb_build_object('email', NEW.email), NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update user contribution count
CREATE OR REPLACE FUNCTION public.update_user_contribution_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.profiles 
    SET total_contributions = total_contributions + 1
    WHERE user_id = NEW.user_id;
    RETURN NEW;
  END IF;
  
  IF TG_OP = 'DELETE' THEN
    UPDATE public.profiles 
    SET total_contributions = total_contributions - 1
    WHERE user_id = OLD.user_id;
    RETURN OLD;
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for contribution count updates
CREATE TRIGGER update_user_contributions
  AFTER INSERT OR DELETE ON public.contributions
  FOR EACH ROW EXECUTE FUNCTION public.update_user_contribution_count();

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contributions_updated_at
  BEFORE UPDATE ON public.contributions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_comments_updated_at
  BEFORE UPDATE ON public.comments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();