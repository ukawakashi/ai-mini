const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

let ball = {
    x: canvas.width / 2,
    y: 0,
    radius: 20,
    speed: 0.1,
    color: getRandomColor()
};

let targetColor = getRandomColor();
let score = 0;
let gameOver = false;

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function draw() {
    if (gameOver) return;

    // Clear the canvas
    ctx.fillStyle = "#2c2c2c";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the target color at the bottom
    ctx.fillStyle = targetColor;
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50);

    // Draw the ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();

    // Move the ball
    ball.y += ball.speed;

    // Check if the ball hits the target
    if (ball.y + ball.radius > canvas.height - 50) {
        if (ball.color === targetColor) {
            score++;
            scoreElement.textContent = `Score: ${score}`;
            ball.y = 0;
            ball.color = getRandomColor();
            targetColor = getRandomColor();
        } else {
            gameOver = true;
            alert(`Game Over! Your score is ${score}.`);
        }
    }

    // Keep the ball within the canvas horizontally
    if (ball.x - ball.radius < 0) ball.x = ball.radius;
    if (ball.x + ball.radius > canvas.width) ball.x = canvas.width - ball.radius;

    requestAnimationFrame(draw);
}

canvas.addEventListener("click", (e) => {
    if (gameOver) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    // Switch ball color on click
    if (clickX >= 0 && clickX <= canvas.width) {
        ball.color = getRandomColor();
    }
});

restartBtn.addEventListener("click", () => {
    ball = {
        x: canvas.width / 2,
        y: 0,
        radius: 20,
        speed: 3,
        color: getRandomColor()
    };
    targetColor = getRandomColor();
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
    gameOver = false;
    draw();
});

draw();