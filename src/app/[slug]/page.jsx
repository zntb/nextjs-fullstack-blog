import Menu from '@/components/Menu/Menu';
import styles from './singlePage.module.css';
import Image from 'next/image';
import Comments from '@/components/comments/Comments';

const SinglePage = async () => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>Lorem ipsum dolor sit amet.</h1>
          <div className={styles.user}>
            <div className={styles.userImageContainer}>
              <Image src="/p1.jpeg" alt="" fill className={styles.avatar} />
            </div>

            <div className={styles.userTextContainer}>
              <span className={styles.username}>USER</span>
              <span className={styles.date}>01.01.2024</span>
            </div>
          </div>
        </div>

        <div className={styles.imageContainer}>
          <Image src="/p1.jpeg" alt="" fill className={styles.image} />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div className={styles.description}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
              impedit. Inventore nostrum sequi officiis dicta voluptatum ullam
              commodi adipisci vel amet voluptas, quisquam nihil a dignissimos
              dolorem quam suscipit ab quas ad rem repudiandae ipsa tempora
              nemo? Suscipit harum minima quasi labore unde nobis tempore nulla
              adipisci, beatae, consectetur tempora obcaecati quis id saepe
              dolorem.
            </p>
            <h2>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim,
              libero.
            </h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore
              numquam, quo deleniti, voluptatibus soluta veniam inventore
              cupiditate velit ipsam culpa ad aspernatur ex autem commodi rerum
              laborum possimus saepe quibusdam!
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore
              numquam, quo deleniti, voluptatibus soluta veniam inventore
              cupiditate velit ipsam culpa ad aspernatur ex autem commodi rerum
              laborum possimus saepe quibusdam!
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore
              numquam, quo deleniti, voluptatibus soluta veniam inventore
              cupiditate velit ipsam culpa ad aspernatur ex autem commodi rerum
              laborum possimus saepe quibusdam!
            </p>
          </div>
          <div className={styles.comment}>
            <Comments />
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default SinglePage;
