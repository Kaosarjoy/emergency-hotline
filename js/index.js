
        document.addEventListener('DOMContentLoaded', () => {
            const callButtons = document.querySelectorAll('.call-btn');
            const copyButtons = document.querySelectorAll('.copy-btn');
            const loveButtons = document.querySelectorAll('.love-btn');
            const clearButton = document.getElementById('clear-btn');
            const callHistoryList = document.getElementById('call-history');
            const loveCountSpan = document.getElementById('love-count');
            const coinCountSpan = document.getElementById('coin-count');
            const copyCountSpan = document.getElementById('copy-count');

            let loveCount = 0;
            let coinCount = 100;
            let copyCount = 0;

            // Function to handle the "Copy" button click
            const handleCopy = (event) => {
                const card = event.currentTarget.closest('.card-item');
                const phoneNumber = card.querySelector('h2').textContent.trim();

                navigator.clipboard.writeText(phoneNumber)
                    .then(() => {
                        alert(`Copied number: ${phoneNumber}`);
                        copyCount++;
                        copyCountSpan.textContent = copyCount;
                    })
                    .catch(err => {
                        console.error('Failed to copy text: ', err);
                    });
            };

            // Function to handle the "Call" button click
            const handleCall = (event) => {
                const card = event.currentTarget.closest('.card-item');
                const phoneNumber = card.querySelector('h2').textContent.trim();
                const helplineName = card.querySelector('h1').textContent.trim();

                if (coinCount >= 20) {
                    window.location.href = `tel:${phoneNumber.replace(/-/g, '')}`;
                    coinCount -= 20;
                    coinCountSpan.textContent = coinCount;

                    // Add to call history
                    addCallToHistory(helplineName, phoneNumber);
                } else {
                    alert('Not enough coins to make a call.');
                }
            };

            // Function to handle the "Love" button click
            const handleLove = () => {
                loveCount++;
                loveCountSpan.textContent = loveCount;
            };

            // Function to add a call to the history list
            const addCallToHistory = (name, number) => {
                if (!callHistoryList) return;

                const now = new Date();
                const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
                const formattedDate = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

                const historyItem = document.createElement('li');
                historyItem.className = 'p-3 rounded-lg bg-white shadow-sm flex justify-between items-center text-sm';
                historyItem.innerHTML = `
                    <div>
                        <span class="font-semibold text-gray-800">${name}</span><br>
                        <span class="text-gray-600">${number}</span>
                    </div>
                    <div class="text-right text-gray-400 text-xs">
                        ${formattedDate}<br>
                        ${formattedTime}
                    </div>
                `;
                callHistoryList.prepend(historyItem);
            };

            // Function to clear the call history
            const clearHistory = () => {
                if (callHistoryList) {
                    callHistoryList.innerHTML = '';
                    alert('Call history cleared!');
                }
            };

            // Attach event listeners
            copyButtons.forEach(button => button.addEventListener('click', handleCopy));
            callButtons.forEach(button => button.addEventListener('click', handleCall));
            loveButtons.forEach(button => button.addEventListener('click', handleLove));

            if (clearButton) {
                clearButton.addEventListener('click', clearHistory);
            }

        });
