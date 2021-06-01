import firebase from './firebase'

const auth = firebase.auth()

export const signIn = async ({ email, password }, onSuccess, onError) => {
  try {
    const { user } = await auth.signInWithEmailAndPassword(email, password)
    return onSuccess(user);
  } catch (error) {
    return onError(error)
  }
}

export const createAccount = async ({ username, email, password }, onSuccess, onError) => {
  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password)
    if (user) {
      await user.updateProfile({ displayName: username })
      await user.sendEmailVerification()
      return onSuccess(user)
    }
  } catch (error) {
    return onError(error)
  }
}

export const signOut = async (onSuccess, onError) => {
  try {
    await auth.signOut()
    return onSuccess()
  } catch (error) {
    return onError(error)
  }
}

export const getCurrentUserId = () => auth.currentUser ? auth.currentUser.uid : null

export const getCurrentUserUsername = () => auth.currentUser ? auth.currentUser.displayName : null

export const setOnAuthStageChanged = (onUserAuthenticated, onUserNotFound) => auth.onAuthStateChanged(
  (user) => user ? onUserAuthenticated(user) : onUserNotFound(user))
