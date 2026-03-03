function loadEscapeRoom() {
    const modalContent = document.getElementById("modal-content");

    modalContent.innerHTML = `
        <div id="escape-room" style="color:white; padding:40px; text-align:center;">
            <h2 style="font-size:28px; margin-bottom:20px;">Escape Room: Dark Terminal</h2>
            <p>Kamu terjebak di ruangan digital...</p>
            <button onclick="startPuzzle()" style="margin-top:20px; padding:10px 20px; background:cyan; border:none; cursor:pointer;">
                Mulai Puzzle
            </button>
            <div id="puzzle-area" style="margin-top:30px;"></div>
        </div>
    `;
}

function startPuzzle() {
    document.getElementById("puzzle-area").innerHTML = `
        <p>Teka-teki 1:</p>
        <p>Apa kode biner dari angka 5?</p>
        <input type="text" id="answer">
        <button onclick="checkAnswer()">Submit</button>
    `;
}

function checkAnswer() {
    const answer = document.getElementById("answer").value;
    if(answer === "101") {
        alert("Benar! Pintu pertama terbuka.");
    } else {
        alert("Salah. Coba lagi.");
    }
}
