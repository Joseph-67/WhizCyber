let faqData = {
    "What services do you offer?": "We provide a range of cybersecurity services, including vulnerability assessments, penetration testing, and incident response.",
    "How can I get this service?": "Go to our contact us page and choose a way to reach ou to us on any of our social media platforms or you can email us.",
    "What is your pricing structure?": "Our pricing varies based on the services selected. Contact us for a detailed quote tailored to your needs.",
    "Do you recover lost crypto?": "Yes."
};

// Toggle chatbot visibility and show greeting and FAQ suggestions if just opened
function toggleChatbot() {
    const chatbot = document.getElementById('chatbot-container');
    const chatIcon = document.getElementById('chat-icon');

    if (chatbot.style.display === 'none' || chatbot.style.display === '') {
        chatbot.style.display = 'block';
        chatIcon.style.display = 'none';

        // Show greeting and FAQ suggestions only if opened for the first time
        if (!chatbot.classList.contains('greeting-shown')) {
            displayMessage("Hello! Welcome to Adrian Cyber. How can I assist you today?", 'bot');
            displayFAQSuggestions();
            chatbot.classList.add('greeting-shown');  // Mark as shown to avoid repeating
        }
    } else {
        chatbot.style.display = 'none';
        chatIcon.style.display = 'flex';
    }
}

// Display a list of FAQ suggestions
function displayFAQSuggestions() {
    const chatWindow = document.getElementById('chat-window');
    const faqContainer = document.createElement('div');
    
    faqContainer.classList.add('faq-container');
    faqContainer.innerHTML = "<p><strong>Here are some questions you might find helpful:</strong></p>";
    
    Object.keys(faqData).forEach((question) => {
        const suggestion = document.createElement('div');
        suggestion.classList.add('faq-suggestion');
        suggestion.textContent = question;
        suggestion.onclick = () => handleFAQClick(question);
        faqContainer.appendChild(suggestion);
    });

    chatWindow.appendChild(faqContainer);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Handle FAQ suggestion click and send corresponding response
function handleFAQClick(question) {
    displayMessage(question, 'user');
    const botResponse = faqData[question] || "I'm sorry, I don't have an answer for that.";
    setTimeout(() => displayMessage(botResponse), 500);
}

// Display messages in chat window
function displayMessage(message, sender = 'bot') {
    const chatWindow = document.getElementById('chat-window');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ' + (sender === 'bot' ? 'bot-message' : 'user-message');
    messageDiv.innerHTML = message;  // Allow HTML for link
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Process user message and respond with FAQ data or a friendly response
function sendMessage() {
    const userInput = document.getElementById('user-input');
    const userMessage = userInput.value.trim().toLowerCase();

    if (userMessage) {
        displayMessage(userInput.value, 'user');
        userInput.value = '';

        // Check for greetings and send friendly response
        if (userMessage.includes('hi') || userMessage.includes('hello')) {
            setTimeout(() => displayMessage("Hi there! Check out our FAQs or reach out to us for more info on our contact us page."), 500);
        }
        // Find matching answer from FAQ data
        else if (faqData[userMessage]) {
            setTimeout(() => displayMessage(faqData[userMessage]), 500);
        } else {
            // Default response for questions not in the FAQ
            const botResponse = "Sorry, I couldn't find an answer for that. Please feel free to reach out to us on our contact us page for more help.";
            setTimeout(() => displayMessage(botResponse), 500);
        }
    }
}

// Allow pressing Enter to send message
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}