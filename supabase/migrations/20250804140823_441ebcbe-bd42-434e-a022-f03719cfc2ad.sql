-- Add admin user for vanagantikarthik@gmail.com
-- First, let's create a function to safely add admin role
CREATE OR REPLACE FUNCTION add_admin_user(admin_email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    admin_user_id uuid;
BEGIN
    -- Get the user ID from auth.users table
    SELECT id INTO admin_user_id 
    FROM auth.users 
    WHERE email = admin_email;
    
    -- If user exists, make them admin
    IF admin_user_id IS NOT NULL THEN
        -- Insert admin role if not exists
        INSERT INTO public.user_roles (user_id, role)
        VALUES (admin_user_id, 'admin'::app_role)
        ON CONFLICT (user_id, role) DO NOTHING;
    END IF;
END;
$$;

-- Try to add admin role for the specified email
-- This will only work if the user already exists in auth.users
SELECT add_admin_user('vanagantikarthik@gmail.com');