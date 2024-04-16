import Featured from '@/components/featured/featured';
import styles from './homepage.module.css';
import CardList from '@/components/cardList/CardList';
import Menu from '@/components/menu/Menu';
import CategoryList from '@/components/categoryList/CategoryList';

type SearchParamsProps = {
  searchParams: {
    page: string;
  };
};

export default function Home({ searchParams }: SearchParamsProps) {
  const page = parseInt(searchParams.page) || 1;

  return (
    <div className={styles.container}>
      <Featured />
      <CategoryList />
      <div className={styles.content}>
        <CardList page={page} />
        <Menu />
      </div>
    </div>
  );
}
