import firebase from './firebase'

const db = firebase.database()

const newEvent = (id, title, note, date, time) => ({ id, title, note, date, time })

export const createEvent = async ({ userId, title, note, date, time }, onSuccess, onError) => {
  try {
    const event = db.ref(`events/${userId}`).push()
    await event.set(newEvent(event.key, title, note, date, time))
    return onSuccess(event)
  } catch (error) {
    return onError(error)
  }
}

export const reviewEvent = ({ userId, eventId }, onValueChanged) => {
  const event = db.ref(`events/${userId}/${eventId}`)
  event.on('value', (snapshot) => onValueChanged(snapshot.val()))
  return () => event.off('value')
}

export const updateEvent = async ({ userId, eventId }, { title, note, date, time }, onSuccess, onError) => {
  try {
    const event = db.ref(`events/${userId}/${eventId}`)
    await event.update({ title, note, date, time })
    return onSuccess(event)
  } catch (error) {
    return onError(error)
  }
}

export const deleteEvent = async ({ userId, eventId }, onSuccess, onError) => {
  try {
    await db.ref(`events/${userId}/${eventId}`).remove()
    return onSuccess()
  } catch (error) {
    return onError(error)
  }
}

export const subscribe = (userId, onValueChanged) => {
  const events = db.ref(`events/${userId}`)
  events.on('value', (snapshot) => onValueChanged(snapshot.val()))
  return () => events.off('value')
}
