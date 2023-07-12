import {
  VCard, VCardTitle, VCardSubtitle, VIcon,
} from 'vuetify/components';
import { useStore } from 'vuex';
import { RootStates } from '@/typings';
import { sliceText } from '@/helpers/text';
import CustomImage from '../CustomImage';
import './HeadlineNewsCard.scss';
import HeadlineNewsEdit from './HeadlineNewsEdit';

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
  const slicedSubtitle = sliceText(subtitle);

  const store = useStore<RootStates>();
  const handleEdit = (newsUrl: string) => {
    store.commit('headlines/setSelected', newsUrl);
  };
  return (
    <VCard maxWidth={400} class="news-card">
      <HeadlineNewsEdit class="news-card__edit" onClick={() => handleEdit(url)} />
      <CustomImage src={imgUrl} customClass="news-card__img" onClick={onReadClick} />
      <VCardTitle class="news-card__title" onClick={onReadClick}>
        {title}
      </VCardTitle>
      <VCardSubtitle class="news-card__subtitle">{slicedSubtitle}</VCardSubtitle>
      <div class="news-card__footer">
        <div class="news-card__date">{date}</div>
        <div class="news-card__read" onClick={onReadClick}>
          Read More<VIcon size="x-small">mdi-chevron-double-right</VIcon>
        </div>
      </div>
    </VCard>
  );
};
