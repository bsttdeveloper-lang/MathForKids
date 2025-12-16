-- Create validation trigger function for feedback table
CREATE OR REPLACE FUNCTION public.validate_feedback()
RETURNS TRIGGER AS $$
BEGIN
  -- Trim whitespace from inputs
  NEW.nickname := trim(NEW.nickname);
  NEW.message := trim(NEW.message);
  
  -- Validate nickname length (1-50 characters after trim)
  IF length(NEW.nickname) = 0 THEN
    RAISE EXCEPTION 'Nickname cannot be empty';
  END IF;
  
  IF length(NEW.nickname) > 50 THEN
    RAISE EXCEPTION 'Nickname must be 50 characters or less';
  END IF;
  
  -- Validate message length (1-500 characters after trim)
  IF length(NEW.message) = 0 THEN
    RAISE EXCEPTION 'Message cannot be empty';
  END IF;
  
  IF length(NEW.message) > 500 THEN
    RAISE EXCEPTION 'Message must be 500 characters or less';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for feedback validation
CREATE TRIGGER validate_feedback_trigger
BEFORE INSERT ON public.feedback
FOR EACH ROW EXECUTE FUNCTION public.validate_feedback();