import firebase from './firebase'

const db = firebase.database()

const newModule = (id, name, code, classes) => ({ id, name, code, classes })

export const createModule = async ({ userId, name, code, classes }, onSuccess, onError) => {
  try {
    const module = db.ref(`modules/${userId}`).push()
    await module.set(newModule(module.key, name, code, classes))
    return onSuccess(module)
  } catch (error) {
    return onError(error)
  }
}

export const deleteModule = async ({ userId, moduleId }, onSuccess, onError) => {
  try {
    await db.ref(`modules/${userId}/$${moduleId}`).remove()
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
