import { supabase } from '@lib/supabase';

const form = document.getElementById('login-form') as HTMLFormElement | null;
const submitButton = document.getElementById('login-button') as HTMLButtonElement | null;
const errorMessageDiv = document.getElementById('error-message') as HTMLDivElement | null;

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    submitButton?.setAttribute('disabled', 'true');
    if (submitButton) submitButton.innerText = 'Entrando...';
    if (errorMessageDiv) errorMessageDiv.innerText = '';

    const formData = new FormData(form);
    const email = (formData.get('email') || '') as string;
    const password = (formData.get('password') || '') as string;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (errorMessageDiv) errorMessageDiv.innerText = error.message;
      submitButton?.removeAttribute('disabled');
      if (submitButton) submitButton.innerText = 'Entrar';
      return;
    }

    // Sucesso! Redireciona para a página inicial (Feed)
    window.location.href = '/';
  });
}