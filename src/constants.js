export const apiUrl = 'http://185.39.79.80:8000/api/';

export const ERROR_MESSAGES = {
  400: 'Неверные данные',
  401: 'Вы не авторизованы!',
  403: 'У вас нет доступа!',
  404: 'Не найдено',
  405: 'Неверный запрос',
  500: 'Ошибка сервера',
};

export const ROLES = [
  {
    en: 'user',
    ru: 'пользователь',
  },
  {
    en: 'supervisor',
    ru: 'супервайзер',
  },
  {
    en: 'admin',
    ru: 'админ',
  },
];
