function Messung1 () {
    Liste1 = []
    for (let index = 0; index < 5; index++) {
        pins.digitalWritePin(DigitalPin.P0, 0)
        // Ließ dir alle Kommentare durch, 2 davon sind Lustig
        control.waitMicros(2)
        // Aus getrickst du Trottle
        pins.digitalWritePin(DigitalPin.P0, 1)
        // Reihenfolge beachten
        control.waitMicros(10)
        // SCHON Wieder TROTTLE
        pins.digitalWritePin(DigitalPin.P0, 0)
        // Waaas schon wieder. Du Trotlle
        Pulsdauer1 = pins.pulseIn(DigitalPin.P1, PulseValue.High)
        // Bist du Blöde ???
        Entfernung1 = Math.trunc(Pulsdauer1 * 153 / 29 / 2 / 100)
        Liste1.push(Entfernung1)
        basic.pause(20)
    }
    Liste1.sort()
Entfernung1 = Liste1[2]
}
function Messung2 () {
    Liste2 = []
    for (let index = 0; index < 5; index++) {
        pins.digitalWritePin(DigitalPin.P2, 0)
        // Ließ dir alle Kommentare durch, 2 davon sind Lustig
        control.waitMicros(2)
        // Aus getrickst du Trottle
        pins.digitalWritePin(DigitalPin.P2, 1)
        // Reihenfolge beachten
        control.waitMicros(10)
        // SCHON Wieder TROTTLE
        pins.digitalWritePin(DigitalPin.P2, 0)
        // Waaas schon wieder. Du Trotlle
        Pulsdauer2 = pins.pulseIn(DigitalPin.P3, PulseValue.High)
        // Bist du Blöde ???
        Entfernung2 = Math.trunc(Pulsdauer2 * 153 / 29 / 2 / 100)
        Liste2.push(Entfernung2)
        basic.pause(20)
    }
    Liste2.sort()
Entfernung2 = Liste2[2]
}
let Richtung = 0
let Entfernung2 = 0
let Pulsdauer2 = 0
let Entfernung1 = 0
let Pulsdauer1 = 0
let Liste1: number[] = []
let Liste2: number[] = []
let Schwellwert = 20
let Kurvendauer = 100
let Kurvenanzahl = 5
let Geschwindigkeit = 60
basic.forever(function () {
    Messung1()
    Messung2()
    if (Entfernung1 > Schwellwert && Entfernung2 > Schwellwert) {
        motors.dualMotorPower(Motor.AB, Geschwindigkeit)
        basic.setLedColor(0x00ff00)
    } else {
        if (Entfernung1 < Schwellwert && Entfernung2 >= Schwellwert) {
            basic.setLedColor(0x0000ff)
            for (let index = 0; index < Kurvenanzahl; index++) {
                motors.dualMotorPower(Motor.A, 0)
                motors.dualMotorPower(Motor.B, Geschwindigkeit)
                basic.pause(Kurvendauer)
                Richtung = 0
            }
        } else {
            if (Entfernung1 >= Schwellwert && Entfernung2 < Schwellwert) {
                basic.setLedColor(0xff0000)
                for (let index = 0; index < Kurvenanzahl; index++) {
                    motors.dualMotorPower(Motor.A, Geschwindigkeit)
                    motors.dualMotorPower(Motor.B, 0)
                    basic.pause(Kurvendauer)
                    Richtung = 1
                }
            } else {
                if (Entfernung1 < Schwellwert && Entfernung2 < Schwellwert) {
                    if (Richtung == 1) {
                        motors.dualMotorPower(Motor.A, Geschwindigkeit)
                        motors.dualMotorPower(Motor.B, 0)
                    } else {
                        motors.dualMotorPower(Motor.A, 0)
                        motors.dualMotorPower(Motor.B, Geschwindigkeit)
                    }
                }
            }
        }
    }
})
