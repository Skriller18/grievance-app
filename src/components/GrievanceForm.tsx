import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Send, Trash2, Image, Loader2 } from 'lucide-react';
import { FormState, FormErrors } from '../types';
import ImageUpload from './ImageUpload';
import { sendGrievance } from '../services/grievanceService';
import toast from 'react-hot-toast';

const GrievanceForm: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    message: '',
    images: [],
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormState({ ...formState, message: e.target.value });
    
    // Clear error when user starts typing
    if (errors.message && e.target.value.trim()) {
      setErrors({ ...errors, message: undefined });
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      const newImages = [...formState.images, ...filesArray].slice(0, 3); // Limit to 3 images
      setFormState({ ...formState, images: newImages });
      
      // Generate preview URLs
      const newImagePreviewUrls = newImages.map(file => URL.createObjectURL(file));
      
      // Revoke old URLs to prevent memory leaks
      imagePreviewUrls.forEach(url => URL.revokeObjectURL(url));
      
      setImagePreviewUrls(newImagePreviewUrls);
      
      if (errors.images) {
        setErrors({ ...errors, images: undefined });
      }
    }
  };

  const removeImage = (index: number) => {
    // Create new arrays without the removed image
    const newImages = formState.images.filter((_, i) => i !== index);
    
    // Revoke the URL of the removed image
    URL.revokeObjectURL(imagePreviewUrls[index]);
    
    const newPreviewUrls = imagePreviewUrls.filter((_, i) => i !== index);
    
    setFormState({ ...formState, images: newImages });
    setImagePreviewUrls(newPreviewUrls);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formState.message.trim()) {
      newErrors.message = "Please share your thoughts";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await sendGrievance(formState);
      
      // Reset form after successful submission
      setFormState({ message: '', images: [] });
      
      // Revoke all image preview URLs
      imagePreviewUrls.forEach(url => URL.revokeObjectURL(url));
      setImagePreviewUrls([]);
      
      toast.success("Your thoughts have been shared successfully");
    } catch (error) {
      console.error(error);
      toast.error("Couldn't send your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card animate-fade-in">
      <div className="mb-4">
        <label htmlFor="message" className="form-label">
          What's on your mind?
        </label>
        <textarea
          id="message"
          rows={5}
          className={`form-input resize-none ${errors.message ? 'border-accent-500 focus:border-accent-500 focus:ring-accent-300' : ''}`}
          placeholder="Share your thoughts, feelings, or concerns..."
          value={formState.message}
          onChange={handleMessageChange}
          disabled={isSubmitting}
        ></textarea>
        {errors.message && (
          <p className="form-error">{errors.message}</p>
        )}
      </div>
      
      <ImageUpload 
        imagePreviewUrls={imagePreviewUrls}
        onImageUpload={handleImageUpload}
        onRemoveImage={removeImage}
        isSubmitting={isSubmitting}
        error={errors.images}
      />
      
      <div className="mt-6">
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Share
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default GrievanceForm;