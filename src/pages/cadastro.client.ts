import { supabase } from '@lib/supabase';

const form = document.getElementById('signup-form') as HTMLFormElement | null;
const submitButton = document.getElementById('signup-button') as HTMLButtonElement | null;
const errorMessageDiv = document.getElementById('error-message') as HTMLDivElement | null;

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    submitButton?.setAttribute('disabled', 'true');
    if (submitButton) submitButton.innerText = 'Criando conta...';
    if (errorMessageDiv) errorMessageDiv.innerText = '';

    const formData = new FormData(form);
    const name = (formData.get('name') || '') as string;
    const email = (formData.get('email') || '') as string;
    const password = (formData.get('password') || '') as string;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      if (errorMessageDiv) errorMessageDiv.innerText = error.message;
      submitButton?.removeAttribute('disabled');
      if (submitButton) submitButton.innerText = 'Criar conta';
      return;
    }

    alert('Cadastro realizado! Verifique seu email para confirmar a conta.');
    window.location.href = '/login';
  });
}