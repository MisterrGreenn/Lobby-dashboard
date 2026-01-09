export type ManualBusSchedule = {
  line: string
  direction: string
  destination: string
  via: string
  platform: string
  stopName: string
  connections?: string
  timesWeekday: string[]
  timesSaturday: string[]
  timesSunday: string[]
}

// Demo schedule: Seefeld → Innsbruck
export const MANUAL_BUS_DEMO_1: ManualBusSchedule = {
  line: '420',
  direction: 'Seefeld—Scharnitz—Innsbruck',
  destination: 'Innsbruck Hbf',
  via: 'Scharnitz, Zirl',
  platform: 'Steig 1',
  stopName: 'Seefeld Zentrum',
  connections: 'ICE to München, Zürich • RJX to Wien, Salzburg • S-Bahn to Hall, Schwaz',
  timesWeekday: [
    '05:45', '06:30', '07:15', '07:45', '08:30', '09:15', '10:00',
    '10:45', '11:30', '12:15', '13:00', '13:45', '14:30', '15:15',
    '16:00', '16:45', '17:30', '18:15', '19:00', '19:45', '20:30',
  ],
  timesSaturday: [
    '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
  ],
  timesSunday: [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
  ],
}

// Demo schedule: Seefeld → Mittenwald (Germany)
export const MANUAL_BUS_DEMO_2: ManualBusSchedule = {
  line: '421',
  direction: 'Seefeld—Mittenwald—Garmisch',
  destination: 'Garmisch-Partenkirchen Bf',
  via: 'Mittenwald Bf',
  platform: 'Steig 2',
  stopName: 'Seefeld Zentrum',
  connections: 'DB to München Hbf • Zugspitzbahn to Zugspitze',
  timesWeekday: [
    '06:15', '07:00', '08:00', '09:00', '10:30', '12:00',
    '13:30', '15:00', '16:30', '18:00', '19:30',
  ],
  timesSaturday: [
    '07:30', '09:00', '10:30', '12:00', '13:30', '15:00',
    '16:30', '18:00', '19:30',
  ],
  timesSunday: [
    '08:30', '10:00', '11:30', '13:00', '14:30', '16:00',
    '17:30', '19:00',
  ],
}
