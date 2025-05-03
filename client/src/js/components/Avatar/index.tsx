import avatarImg from '/public/avatar.png'

// Styles
import styles from './index.module.sass';

const Avatar = () => {
  return (
    <div className={styles.avatar}>
      <img className={styles.avatar__img} src={avatarImg} />
    </div>
  )
}

export default Avatar