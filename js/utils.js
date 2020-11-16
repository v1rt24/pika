export const validEmail = email => {
  return /^.+@.+\.[a-z]{2,}$/.test(email);
};

export const validationLength = val => {
  return val.trim().length > 0;
};

export const validationFormFields = form => {
  const els = [...form.elements].filter(el => el.tagName !== 'BUTTON');
  return els.every(el => el.value);
};