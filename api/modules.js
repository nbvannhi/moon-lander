import firebase from './firebase'

const db = firebase.database()

const newModule = (id, name, code, lessons) => ({ id, name, code, lessons })

export const createModule = async ({ userId, name, code, lessons }, onSuccess, onError) => {
  try {
    const module = db.ref(`modules/${userId}`).push()
    await module.set(newModule(module.key, name, code, lessons))
    return onSuccess(module)
  } catch (error) {
    return onError(error)
  }
}

export const reviewModule = async ({ userId, moduleId }, onSuccess, onError) => {
  const module = db.ref(`module/${userId}/${moduleId}`)
  module.on('value', (snapshot) => onValueChanged(snapshot.val()))
  return () => module.off('value')
}

export const updateModule = async ({ userId, moduleId }, { name, code, lessons }, onSuccess, onError) => {
  try {
    const module = db.ref(`modules/${userId}/${moduleId}`)
    await module.update({ name, code, lessons })
    return onSuccess(module)
  } catch (error) {
    return onError(error)
  }
}

export const deleteModule = async ({ userId, moduleId }, onSuccess, onError) => {
  try {
    await db.ref(`modules/${userId}/${moduleId}`).remove()
    return onSuccess()
  } catch (error) {
    return onError(error)
  }
}

export const subscribe = (userId, onValueChanged) => {
  const modules = db.ref(`modules/${userId}`)
  modules.on('value', (snapshot) => onValueChanged(snapshot.val()))
  return () => modules.off('value')
}
