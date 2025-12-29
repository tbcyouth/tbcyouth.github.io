export const sendMessage = async (text) => {
    const token = '7296052919:AAGLs328W1bAzbC0400Uu274EFQLULWgD3U';
    const chatId = '-5163604995';

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