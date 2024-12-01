document.addEventListener("DOMContentLoaded", () => {
    // Check if we're on the Post Idea page
    if (document.body.id === "postIdeaPage") {
        const gridContainer = document.getElementById("ideaGrid");
        const ideaModal = document.getElementById("ideaModal");
        const ideaTitleInput = document.getElementById("ideaTitle");
        const ideaNameInput = document.getElementById("ideaName");
        const ideaContentInput = document.getElementById("ideaContent");
        const saveIdeaButton = document.getElementById("saveIdeaButton");
        const closeModalButton = document.getElementById("closeModalButton");

        // Define pastel colors for the squares
        const pastelColors = ["#FFD700", "#FFA500", "#87CEFA", "#FF69B4", "#ADFF2F"];

        // Function to get a random color
        const getRandomColor = () => pastelColors[Math.floor(Math.random() * pastelColors.length)];

        // Function to create a square
        const createSquare = (index) => {
            const square = document.createElement("div");
            square.classList.add("square");
            square.style.backgroundColor = getRandomColor();
            square.dataset.index = index; // Save index for reference
            square.dataset.title = ""; // Initialize title
            square.dataset.name = ""; // Initialize name
            square.dataset.content = ""; // Initialize content
            gridContainer.appendChild(square);

            // Add click event to open the modal
            square.addEventListener("click", () => {
                ideaModal.classList.remove("hidden");
                ideaModal.dataset.activeSquare = index; // Track the active square
                ideaTitleInput.value = square.dataset.title || ""; // Load saved title
                ideaNameInput.value = square.dataset.name || ""; // Load saved name
                ideaContentInput.value = square.dataset.content || ""; // Load saved content
            });

            updateSquareContent(square); // Set the initial content
        };

        // Function to update the square's content
        const updateSquareContent = (square) => {
            const title = square.dataset.title || "Untitled";
            const name = square.dataset.name || "Anonymous";
            square.innerHTML = `
                <strong>${title}</strong>
                <br>
                <small>by ${name}</small>
            `;
        };

        // Generate 100 squares
        for (let i = 0; i < 100; i++) {
            createSquare(i);
        }

        // Close the modal
        closeModalButton.addEventListener("click", () => {
            ideaModal.classList.add("hidden");
            ideaTitleInput.value = "";
            ideaNameInput.value = "";
            ideaContentInput.value = "";
        });

        // Save the idea
        saveIdeaButton.addEventListener("click", () => {
            const activeSquareIndex = ideaModal.dataset.activeSquare;
            const activeSquare = gridContainer.children[activeSquareIndex];
            const title = ideaTitleInput.value.trim();
            const name = ideaNameInput.value.trim();
            const content = ideaContentInput.value.trim();

            if (!title || !content) {
                alert("Both title and idea content are required!");
                return;
            }

            // Save data to the square
            activeSquare.dataset.title = title;
            activeSquare.dataset.name = name || "Anonymous"; // Default to "Anonymous" if name is empty
            activeSquare.dataset.content = content;

            // Update square content to display title and name
            updateSquareContent(activeSquare);

            // Close the modal
            ideaModal.classList.add("hidden");
            ideaTitleInput.value = "";
            ideaNameInput.value = "";
            ideaContentInput.value = "";
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    // Check if we're on the View All Ideas page
    if (document.body.id === "viewIdeasPage") {
        const ideasGrid = document.getElementById("ideasGrid");
        const noIdeasMessage = document.getElementById("noIdeasMessage");

        // Example: Fetch shared ideas (in a real app, this might come from a server)
        const sharedIdeas = []; // Empty array indicates no ideas are shared yet

        // Function to create an idea square
        const createIdeaSquare = (idea) => {
            const square = document.createElement("div");
            square.classList.add("square");
            square.innerHTML = `
                <strong>${idea.title}</strong>
                <br>
                <small>by ${idea.name}</small>
            `;
            ideasGrid.appendChild(square);
        };

        // Check if there are shared ideas
        if (sharedIdeas.length === 0) {
            // Show the default message
            noIdeasMessage.classList.remove("hidden");
        } else {
            // Hide the default message and display ideas
            noIdeasMessage.classList.add("hidden");
            sharedIdeas.forEach(createIdeaSquare);
        }
    }
});
const sharedIdeas = [
    { title: "Recycling Made Easy", name: "Alice" },
    { title: "AI in Daily Life", name: "Bob" },
    { title: "Future of Transportation", name: "Charlie" }
];
document.addEventListener("DOMContentLoaded", () => {
    // Check if we're on the Trending Ideas page
    if (document.body.id === "trendingIdeasPage") {
        const trendingGrid = document.getElementById("trendingGrid");
        const noTrendingMessage = document.getElementById("noTrendingMessage");

        // Example data structure (replace with real data fetching logic)
        const ideas = [
            { title: "Clean Energy", name: "Alice", likes: 100 },
            { title: "Urban Farming", name: "Bob", likes: 50 },
            { title: "AI for Good", name: "Charlie", likes: 75 }
        ];

        // Filter and sort trending ideas based on likes
        const trendingIdeas = ideas.filter(idea => idea.likes > 50).sort((a, b) => b.likes - a.likes);

        // Function to create a trending idea square
        const createTrendingSquare = (idea) => {
            const square = document.createElement("div");
            square.classList.add("square");
            square.innerHTML = `
                <strong>${idea.title}</strong>
                <br>
                <small>by ${idea.name}</small>
                <br>
                <em>${idea.likes} likes</em>
            `;
            trendingGrid.appendChild(square);
        };

        // Check if there are trending ideas
        if (trendingIdeas.length === 0) {
            // Show the default message
            noTrendingMessage.classList.remove("hidden");
        } else {
            // Hide the default message and populate the grid
            noTrendingMessage.classList.add("hidden");
            trendingIdeas.forEach(createTrendingSquare);
        }
    }
});
document.addEventListener("DOMContentLoaded", () => {
    if (document.body.id === "viewIdeasPage" || document.body.id === "postIdeaPage") {
        const gridContainer = document.getElementById("ideasGrid") || document.getElementById("ideaGrid");

        // Example of idea storage (in a real app, fetch from a database or API)
        const sharedIdeas = [
            { title: "Clean Energy", name: "Alice", likes: 0 },
            { title: "AI for Good", name: "Bob", likes: 0 },
        ];

        // Function to create an idea square with a like button
        const createIdeaSquare = (idea, index) => {
            const square = document.createElement("div");
            square.classList.add("square");

            // Add the idea's title, name, and likes
            square.innerHTML = `
                <strong>${idea.title}</strong>
                <br>
                <small>by ${idea.name}</small>
                <br>
                <button class="like-button" data-index="${index}">
                    👍 Like (<span class="like-count">${idea.likes}</span>)
                </button>
            `;

            gridContainer.appendChild(square);

            // Add like button functionality
            const likeButton = square.querySelector(".like-button");
            likeButton.addEventListener("click", () => {
                sharedIdeas[index].likes += 1; // Increment likes
                const likeCount = likeButton.querySelector(".like-count");
                likeCount.textContent = sharedIdeas[index].likes; // Update like count
            });
        };

        // Populate the grid with ideas
        sharedIdeas.forEach(createIdeaSquare);
    }
});
document.addEventListener("DOMContentLoaded", () => {
    if (document.body.id === "trendingIdeasPage") {
        const trendingGrid = document.getElementById("trendingGrid");

        // Example of idea storage (replace with database or API fetch)
        const sharedIdeas = [
            { title: "Clean Energy", name: "Alice", likes: 12 },
            { title: "AI for Good", name: "Bob", likes: 25 },
            { title: "Urban Farming", name: "Charlie", likes: 5 },
        ];

        // Sort ideas by likes (most likes first)
        const trendingIdeas = sharedIdeas.sort((a, b) => b.likes - a.likes);

        // Function to create a trending idea square
        const createTrendingSquare = (idea) => {
            const square = document.createElement("div");
            square.classList.add("square");
            square.innerHTML = `
                <strong>${idea.title}</strong>
                <br>
                <small>by ${idea.name}</small>
                <br>
                <em>${idea.likes} likes</em>
            `;
            trendingGrid.appendChild(square);
        };

        // Display trending ideas
        trendingIdeas.forEach(createTrendingSquare);
    }
});
document.addEventListener("DOMContentLoaded", () => {
    // Check if we're on the homepage
    if (document.body.id === "homepage") {
        const titleContainer = document.getElementById("titleContainer");

        // Define pastel colors
        const pastelColors = ["#FFD700", "#FFA500", "#87CEFA", "#FF69B4", "#ADFF2F"];

        // Function to get a random color
        const getRandomColor = () => pastelColors[Math.floor(Math.random() * pastelColors.length)];

        // Apply random background color
        titleContainer.style.backgroundColor = getRandomColor();
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const titleSquare = document.getElementById("titleSquare");

    // Define pastel colors
    const pastelColors = ["#FFD700", "#FFA500", "#87CEFA", "#FF69B4", "#ADFF2F"];

    // Function to get a random color
    const getRandomColor = () => pastelColors[Math.floor(Math.random() * pastelColors.length)];

    // Apply a random color to the background
    titleSquare.style.backgroundColor = getRandomColor();
});
document.addEventListener("DOMContentLoaded", () => {
    const backHomeButton = document.getElementById("backHomeButton");

    // Define pastel colors
    const pastelColors = ["#FFD700", "#FFA500", "#87CEFA", "#FF69B4", "#ADFF2F"];

    // Function to get a random color
    const getRandomColor = () => pastelColors[Math.floor(Math.random() * pastelColors.length)];

    // Apply random color to the button
    backHomeButton.style.backgroundColor = getRandomColor();
});
backHomeButton.addEventListener("mouseover", () => {
    backHomeButton.style.filter = "brightness(1.2)";
});
backHomeButton.addEventListener("mouseout", () => {
    backHomeButton.style.filter = "brightness(1)";
});
