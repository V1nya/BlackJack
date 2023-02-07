import color from "colors"
import read from "readline";

function blackJack() {
    let userCount = 0
    let userCard = []
    let card = ["♥", "♦", "♣", "♠"]
    let randomCard = (number = 13) => {
        return Math.floor(Math.random() * number) + 1
    }
    let readConsole = (props) => {
        const rl = read.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question('Достаємо карту (так або ні)?\n>', (answer) => {
            rl.close()
            props(answer)
        });


    }
    let botCardDeck = (bot = {
        countCard: 0,
        card: []
    }) => {


        do {
            let numCard = randomCard()
            let newCard = ""
            switch (numCard) {
                case 11:
                    newCard = "J" + card[randomCard(4) - 1]
                    break
                case 12:
                    newCard = "Q" + card[randomCard(4) - 1]
                    break
                case 13:
                    newCard = "K" + card[randomCard(4) - 1]
                    break
                case 1:
                    newCard = "A" + card[randomCard(4) - 1]
                    break
                default:
                    newCard = numCard + card[randomCard(4) - 1]
                    break
            }

            if (bot.card.indexOf(newCard) === -1) {
                // console.log(`Бот витягнув: ${newCard}`.red)
                bot.countCard += numCard
                bot.card.push(newCard)

                let procent = Math.floor(bot.countCard / (21) * 100)
                // console.log(`${procent}`.green)

                if (bot.countCard > 20)
                    break
                else if (procent > 55) {
                    let range = 100 - procent
                    let start = randomCard(100 - range)
                    let yesOrNo = randomCard(100)
                    if (yesOrNo > start && yesOrNo < (start + range)) {
                        // console.log("GO")
                        // console.log(`S ${start} ST ${start+range} R ${range} YORN ${yesOrNo}`)

                    } else {
                        // console.log("STOP")
                        // console.log(`S ${start} ST ${start+range} R ${range} YORN ${yesOrNo}`)
                        break
                    }

                }

            }
        } while (true)

        return bot
    }


    let userCardDeck = (answer) => {

        if (answer === "n" || answer === "no"
            || answer === "н" || answer === "ні") {
            console.clear()
            // console.log("Черга ботnа брати карти".yellow)
            let bot = botCardDeck()
            console.log("Карти бота:\n" + bot.card.join(" | ").green)
            console.log(`Рахунок бота: ${bot.countCard}`.red)

            if (userCard.length > 0)
                console.log("Ваші карти:\n" + userCard.join(" | ").green)
            console.log(`Ваш рахунок: ${userCount}`.red)
            if (userCount === bot.countCard || ( bot.countCard>21 && userCount>21)){
                console.log(`---------------\n Нічія\n---------------`.magenta)
            }
            else if ((userCount>bot.countCard || bot.countCard>21) && userCount<22 ){
                console.log(`---------------\n Ви перемогли\n---------------`.magenta)
            }
            else {
                console.log(`---------------\n Ви програли\n---------------`.magenta)
            }


        } else if (answer === "y" || answer === "yes"
            || answer === "т" || answer === "так") {
            if (userCard.length > 0)
                console.log("Ваші карти:\n" + userCard.join(" | ").green)
            if (userCard.length === 52) {
                console.log(`Карти в колоді закінчились\nВаш рахунок: ${userCount}`.red)
            } else {
                do {
                    let numCard = randomCard()
                    let newCard = ""
                    switch (numCard) {
                        case 11:
                            newCard = "J" + card[randomCard(4) - 1]
                            break
                        case 12:
                            newCard = "Q" + card[randomCard(4) - 1]
                            break
                        case 13:
                            newCard = "K" + card[randomCard(4) - 1]
                            break
                        case 1:
                            newCard = "A" + card[randomCard(4) - 1]
                            break
                        default:
                            newCard = numCard + card[randomCard(4) - 1]
                            break
                    }

                    if (userCard.indexOf(newCard) === -1) {
                        console.log(`Ви витягнули: ${newCard}`.red)
                        userCount += numCard
                        userCard.push(newCard)
                        break
                    }
                } while (true)
                readConsole(userCardDeck)
            }
        } else {
            console.log("Не зрозумів вас")
            readConsole(userCardDeck)

        }

    }
    console.log("Правила".red)
    console.log("Black Jack також відомий як \"21\"." +
        "\nСуть гри проста: набрати 21 очко або більше, ніж у руках дилера(Бота), \n" +
        "але в жодному разі не більше 21. Якщо гравець набирає більше 21, він «згорає».\n" +
        "A(Туз) - 1 очко\nK(Король) - 13 очок \nQ(Королева) - 12 очок \nJ(Валет) - 12 очок".green )

    readConsole(userCardDeck)

}

blackJack()