import firebase from './firebase'

const db = firebase.database()

const newEvent = (id, moduleCode, type, percentage, dates) => ({ id, type, percentage, dates })

export const createEvent = async ({ userId, moduleCode, type, percentage, dates }, onSuccess, onError) => {
  try {
    const event = db.ref(`events/${userId}`).push()
    await event.set(newModule(event.key, moduleCode, type, percentage, dates))
    return onSuccess(event)
  } catch (error) {
    return onError(error)
  }
}

export const reviewEvent = async ({ userId, eventId }, onSuccess, onError) => {
  const event = db.ref(`event/${userId}/${eventId}`)
  event.on('value', (snapshot) => onValueChanged(snapshot.val()))
  return () => event.off('value')
}

export const updateEvent = async ({ userId, eventId }, { moduleCode, type, percentage, dates }, onSuccess, onError) => {
  try {
    const event = db.ref(`events/${userId}/${eventId}`)
    await event.update({ moduleCode, type, percentage, dates })
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
