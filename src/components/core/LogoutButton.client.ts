import { supabase } from '@lib/supabase';

const button = document.getElementById('logout-button');

button?.addEventListener('click', async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Erro ao sair:', error.message);
  } else {
    window.location.href = '/login';
  }
});