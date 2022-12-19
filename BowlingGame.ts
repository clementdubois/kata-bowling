export class BowlingGame {
    private numberOfPinsDown: number[] = [];

    roll(number: number) {
        this.numberOfPinsDown.push(number)
    }

    getScore() {
        let score = 0, currentRoll = 0;
        for (let frame = 0; frame < 10; frame++) {
            if (this.isStrike(currentRoll)) {
                score += this.strikeScoreWithBonus(currentRoll)
                currentRoll++
            } else if (this.isSpare(currentRoll)) {
                score += this.spareScoreWithBonus(currentRoll)
                currentRoll += 2
            } else {
                score += this.frameScore(currentRoll)
                currentRoll += 2
            }
        }
        return score;
    }

    private isStrike(currentRoll: number) {
        return this.numberOfPinsDown[currentRoll] === 10;
    }

    private strikeScoreWithBonus(currentRoll: number) {
        return 10 + this.numberOfPinsDown[currentRoll + 1] + this.numberOfPinsDown[currentRoll + 2];
    }

    private frameScore(currentRoll: number) {
        return this.numberOfPinsDown[currentRoll] + this.numberOfPinsDown[currentRoll + 1];
    }

    private spareScoreWithBonus(i: number) {
        return 10 + this.numberOfPinsDown[i + 2];
    }

    private isSpare(currentRoll: number) {
        return this.numberOfPinsDown[currentRoll] + this.numberOfPinsDown[currentRoll + 1] === 10;
    }

}