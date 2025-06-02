import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_ID || 'xgegrdpz');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (state.succeeded) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">{t('contact.title')}</h1>
        <div className="bg-green-50 dark:bg-green-900 p-6 rounded-lg text-center">
          <h2 className="text-2xl font-semibold text-green-700 dark:text-green-300 mb-4">
            {t('contact.successMessage')}
          </h2>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            {t('contact.submit')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{t('contact.title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">{t('contact.title')}</h2>
          <p className="mb-6">
            {t('contact.description')}
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Email</h3>
              <p>contact@sho43.com</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Twitter</h3>
              <p>@sho43_</p>
            </div>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                {t('contact.name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                {t('contact.email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                {t('contact.message')}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
              <ValidationError prefix="Message" field="message" errors={state.errors} />
            </div>
            <button
              type="submit"
              disabled={state.submitting}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg disabled:opacity-50"
            >
              {state.submitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  送信中...
                </span>
              ) : (
                t('contact.submit')
              )}
            </button>
            <ValidationError errors={state.errors} />
          </form>
        </div>
      </div>
    </div>
  );
} 