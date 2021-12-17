import {
  VCard, VCardTitle, VCardSubtitle, VIcon,
} from 'vuetify/lib/components';
import { useStore } from 'vuex';
import { RootStates } from '@/typings';
import CustomImage from '../CustomImage';
import './HeadlineNewsCard.scss';
import HeadlineNewsEdit from './HeadlineNewsEdit';
import HeadlineNewsGo from './HeadlineNewsGo';

export default (
  {
    title,
    subtitle,
    imgUrl,
    date,
    url,
    onReadClick,
  }: {
    title: string;
    subtitle: string;
    imgUrl: string;
    date: string;
    url: string;
    onReadClick: () => void;
  },
  { emit }: { emit: (e: string, params: any) => void },
): JSX.Element => {
  const MAX_SUBTITLE = 100;
  const slicedSubtitle = subtitle && subtitle.length > MAX_SUBTITLE ? `${subtitle.slice(0, MAX_SUBTITLE)}...` : subtitle;
  const store = useStore<RootStates>();
  const handleEdit = (newsUrl: string) => {
    store.commit('setSelectedHeadline', newsUrl);
  };
  return (
    <VCard maxWidth={400} class="news-card">
      <HeadlineNewsEdit class="news-card__edit" onClick={() => handleEdit(url)} />
      <a class="news-card__go" href={url} target="_blank">
        <HeadlineNewsGo />
      </a>
      <CustomImage src={imgUrl} customClass="news-card__img" onClick={onReadClick} />
      <VCardTitle class="news-card__title" onClick={onReadClick}>
        {title}
      </VCardTitle>
      <VCardSubtitle class="news-card__subtitle">{slicedSubtitle}</VCardSubtitle>
      <div class="news-card__footer">
        <div class="news-card__date">{date}</div>
        <div class="news-card__read" onClick={onReadClick}>
          Read More<VIcon>mdi-arrow-right</VIcon>
        </div>
      </div>
    </VCard>
  );
};
