document.addEventListener("DOMContentLoaded", () => {
    const drawBtn = document.getElementById("draw-btn");
    const lottoNumbersContainer = document.getElementById("lotto-numbers");
    const bonusContainer = document.getElementById("bonus-container");
    const bonusNumberContainer = document.getElementById("bonus-number");
    const themeToggleBtn = document.getElementById("theme-toggle");

    // 다크 모드 토글 로직
    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            themeToggleBtn.textContent = "☀️ 라이트 모드";
        } else {
            themeToggleBtn.textContent = "🌙 다크 모드";
        }
    });

    // 숫자 범위에 따른 색상 클래스 적용 (실제 동행복권 색상 기준)
    const getColorClass = (number) => {
        if (number <= 10) return "color-yellow";
        if (number <= 20) return "color-blue";
        if (number <= 30) return "color-red";
        if (number <= 40) return "color-gray";
        return "color-green"; // 41~45
    };

    // 공(DOM 요소) 생성 함수
    const createBall = (number, delay) => {
        const ball = document.createElement("div");
        ball.classList.add("ball", getColorClass(number));
        ball.textContent = number;
        ball.style.animationDelay = `${delay}s`; // 공이 하나씩 튀어나오게 딜레이 설정
        return ball;
    };

    // 번호 추첨 로직
    const drawNumbers = () => {
        // 기존 결과 초기화
        lottoNumbersContainer.innerHTML = "";
        bonusNumberContainer.innerHTML = "";
        bonusContainer.style.display = "none";
        
        // 버튼 비활성화 (추첨 중 중복 클릭 방지)
        drawBtn.disabled = true;
        drawBtn.style.cursor = "not-allowed";
        drawBtn.style.opacity = "0.7";

        // 1~45 숫자 생성 및 무작위 셔플
        const candidate = Array.from({ length: 45 }, (_, i) => i + 1);
        const shuffled = [];

        while (candidate.length > 0) {
            const randomIdx = Math.floor(Math.random() * candidate.length);
            const spliceArray = candidate.splice(randomIdx, 1);
            shuffled.push(spliceArray[0]);
        }

        // 보너스 번호와 6개 당첨 번호 분류 (오름차순 정렬)
        const bonusNumber = shuffled[6];
        const winNumbers = shuffled.slice(0, 6).sort((a, b) => a - b);

        // 정렬된 6개의 공 화면에 추가
        winNumbers.forEach((num, index) => {
            const ball = createBall(num, index * 0.15); 
            lottoNumbersContainer.appendChild(ball);
        });

        // 6개가 다 나온 후 보너스 번호 표시
        setTimeout(() => {
            bonusContainer.style.display = "flex";
            const bonusBall = createBall(bonusNumber, 0);
            bonusNumberContainer.appendChild(bonusBall);
            
            // 추첨 완료 후 버튼 다시 활성화
            drawBtn.disabled = false;
            drawBtn.style.cursor = "pointer";
            drawBtn.style.opacity = "1";
        }, winNumbers.length * 150 + 300);
    };

    drawBtn.addEventListener("click", drawNumbers);
});
