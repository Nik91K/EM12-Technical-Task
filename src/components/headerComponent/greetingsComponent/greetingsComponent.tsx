const GreetingsComponent = (): string => {
    const random = Math.random();
    if (random < 0.4) {
        return "Вітаємо";
    }
    const now = new Date()
    const hours = now.getHours()
    const month = now.getMonth()
    const date = now.getDate()
    if ((month === 11 && date === 31) || (month === 0 && date === 1)) {
        return "З новим роком!"
    }
    if ((hours >=5 && hours < 12)) {
        return "Доброго ранку"
    } else if (hours >= 12 && hours < 17) {
        return "Доброго дня"
    } else if (hours >= 17 && hours < 22) {
        return "Доброго вечора"
    } else {
        return "Доброї ночі"
    }
}


export default GreetingsComponent