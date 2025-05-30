export const sendMessage = async (text) => {
    const token = '7721874070:AAHbp2VcQkPQimV8lXsZYTRw8K-zMVZM1-g';
    const chatId = '-1002446355627';

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: text,
            parse_mode: 'HTML'
        })
    });
};