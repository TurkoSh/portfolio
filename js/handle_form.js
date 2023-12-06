const form = document.querySelector('.contact-form');
const sendButton = document.querySelector('#send-button');
const messageDiv = document.querySelector('#message');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const { Name, Email, Subject, Message } = form.elements;
    const maxSubjectLength = 100;
    const maxMessageLength = 1900;

    if (Subject.value.length > maxSubjectLength || Message.value.length > maxMessageLength) {
        messageDiv.textContent = `Subject and message length must be less than ${maxSubjectLength} and ${maxMessageLength} characters, respectively.`;
        messageDiv.style.color = 'red';
        return;
    };

    messageDiv.textContent = '';

    const payload = {
        Name: Name.value,
        Email: Email.value,
        Subject: Subject.value,
        Message: Message.value,
    };

    try {
        const response = await fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            messageDiv.textContent = 'Le message bien été envoyé!';
            messageDiv.style.color = 'green';
            form.reset();
        } else {
            messageDiv.textContent = "Une erreure est survenue pendant l'envoie du message!";
            messageDiv.style.color = 'red';
            console.log('An error occured:', response.statusText);
        };
    } catch (error) {
        messageDiv.textContent = "Une erreure est survenue pendant l'envoie du message!";
        messageDiv.style.color = 'red';
        console.log('An error occured:', error);
    };
});
