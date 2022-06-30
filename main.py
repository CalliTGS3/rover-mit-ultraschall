def Messung1():
    global Liste1, Pulsdauer1, Entfernung1
    Liste1 = []
    for index in range(5):
        pins.digital_write_pin(DigitalPin.P0, 0)
        # Ließ dir alle Kommentare durch, 2 davon sind Lustig
        control.wait_micros(2)
        # Aus getrickst du Trottle
        pins.digital_write_pin(DigitalPin.P0, 1)
        # Reihenfolge beachten
        control.wait_micros(10)
        # SCHON Wieder TROTTLE
        pins.digital_write_pin(DigitalPin.P0, 0)
        # Waaas schon wieder. Du Trotlle
        Pulsdauer1 = pins.pulse_in(DigitalPin.P1, PulseValue.HIGH)
        # Bist du Blöde ???
        Entfernung1 = int(Pulsdauer1 * 153 / 29 / 2 / 100)
        Liste1.append(Entfernung1)
        basic.pause(20)
    Liste1.sort()
    Entfernung1 = Liste1[2]
def Messung2():
    global Liste2, Pulsdauer2, Entfernung2
    Liste2 = []
    for index2 in range(5):
        pins.digital_write_pin(DigitalPin.P2, 0)
        # Ließ dir alle Kommentare durch, 2 davon sind Lustig
        control.wait_micros(2)
        # Aus getrickst du Trottle
        pins.digital_write_pin(DigitalPin.P2, 1)
        # Reihenfolge beachten
        control.wait_micros(10)
        # SCHON Wieder TROTTLE
        pins.digital_write_pin(DigitalPin.P2, 0)
        # Waaas schon wieder. Du Trotlle
        Pulsdauer2 = pins.pulse_in(DigitalPin.P3, PulseValue.HIGH)
        # Bist du Blöde ???
        Entfernung2 = int(Pulsdauer2 * 153 / 29 / 2 / 100)
        Liste2.append(Entfernung2)
        basic.pause(20)
    Liste2.sort()
    Entfernung2 = Liste2[2]
Richtung = 0
Entfernung2 = 0
Pulsdauer2 = 0
Entfernung1 = 0
Pulsdauer1 = 0
Liste1: List[number] = []
Liste2: List[number] = []
Schwellwert = 20
OLED12864_I2C.init(60)

def on_forever():
    Messung1()
    Messung2()
    OLED12864_I2C.clear()
    OLED12864_I2C.show_number(0, 0, Entfernung1, 1)
    OLED12864_I2C.show_number(0, 1, Entfernung2, 1)
basic.forever(on_forever)

def on_forever2():
    global Richtung
    motors.dual_motor_power(Motor.AB, 0)
    if Entfernung1 > Schwellwert and Entfernung2 > Schwellwert:
        motors.dual_motor_power(Motor.AB, 60)
    else:
        if Entfernung1 < Schwellwert and Entfernung2 >= Schwellwert:
            motors.dual_motor_power(Motor.B, 60)
            motors.dual_motor_power(Motor.A, 0)
            Richtung = 0
            basic.pause(1000)
        else:
            if Entfernung1 >= Schwellwert and Entfernung2 < Schwellwert:
                motors.dual_motor_power(Motor.B, 0)
                motors.dual_motor_power(Motor.A, 60)
                Richtung = 1
                basic.pause(1000)
            else:
                if Entfernung1 < Schwellwert and Entfernung2 < Schwellwert:
                    if Richtung == 1:
                        motors.dual_motor_power(Motor.A, 60)
                        motors.dual_motor_power(Motor.B, 0)
                        basic.pause(2000)
                    else:
                        motors.dual_motor_power(Motor.A, 0)
                        motors.dual_motor_power(Motor.B, 60)
                        basic.pause(2000)
basic.forever(on_forever2)
