-- Create ratings table for star ratings
CREATE TABLE public.ratings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  stars INTEGER NOT NULL CHECK (stars >= 1 AND stars <= 5),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create feedback table for user feedback
CREATE TABLE public.feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nickname TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS but allow public access for both tables (anonymous users can rate and leave feedback)
ALTER TABLE public.ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert ratings
CREATE POLICY "Anyone can insert ratings" 
ON public.ratings 
FOR INSERT 
WITH CHECK (true);

-- Allow anyone to read ratings
CREATE POLICY "Anyone can read ratings" 
ON public.ratings 
FOR SELECT 
USING (true);

-- Allow anyone to insert feedback
CREATE POLICY "Anyone can insert feedback" 
ON public.feedback 
FOR INSERT 
WITH CHECK (true);

-- Allow anyone to read feedback
CREATE POLICY "Anyone can read feedback" 
ON public.feedback 
FOR SELECT 
USING (true);

-- Enable realtime for feedback
ALTER PUBLICATION supabase_realtime ADD TABLE public.feedback;
ALTER PUBLICATION supabase_realtime ADD TABLE public.ratings;