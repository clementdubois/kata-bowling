import {BowlingGame} from "./BowlingGame";


describe('Bowling', () => {
    let bowling: BowlingGame;
    beforeEach(() => {
        bowling = new BowlingGame();
    })

    function rollMany(numberOfRolls: Number, pinsDown: number) {
        for (let i = 0; i < numberOfRolls; i++) {
            bowling.roll(pinsDown)
        }
    }

    function makeSpare(numberOfSpare: number = 1) {
        for (let i = 0; i < numberOfSpare; i++) {
            bowling.roll(5);
            bowling.roll(5);
        }
    }
    
    function makeStrike(numberOfStrikes: number = 1) {
        for (let i = 0; i < numberOfStrikes; i++) {
            bowling.roll(10);
        }
    }

    it.each([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])('Should return %d for %d pin down', (numberOfPinsDown) => {
        // WHEN
        bowling.roll(numberOfPinsDown)
        rollMany(19, 0)
        // THEN
        let score = bowling.getScore();
        expect(score).toBe(numberOfPinsDown);
    });

    it('Should return 20 for one pin per roll', () => {
        // WHEN
        rollMany(20, 1);
        // THEN
        let score = bowling.getScore();
        expect(score).toBe(20);
    });


    it('Should return 10 for spare', () => {
        // WHEN
        makeSpare();
        rollMany(19, 0)

        // THEN
        let score = bowling.getScore();
        expect(score).toBe(10);
    });

    it('Should double points for roll after spare', () => {
        // WHEN
        makeSpare();
        bowling.roll(2)
        rollMany(17, 0)
        // THEN
        let score = bowling.getScore();
        expect(score).toBe(14);
    });


    it('Should double points for two roll after strike', () => {
        // WHEN
        makeStrike();
        bowling.roll(2)
        bowling.roll(5)
        rollMany(16, 0)
        // THEN
        let score = bowling.getScore();
        expect(score).toBe(24);
    });

    it('Should make 150 for only spare', () => {
        // WHEN
        makeSpare(10);
        bowling.roll(0)
        // THEN
        let score = bowling.getScore();
        expect(score).toBe(145);
    });

    it('Should make 300 for only strike', () => {
        // WHEN
        makeStrike(12)
        // THEN
        let score = bowling.getScore();
        expect(score).toBe(300);
    });
});



