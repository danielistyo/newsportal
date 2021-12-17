import {
  VCard, VCardTitle, VCardSubtitle, VCardActions, VIcon,
} from 'vuetify/lib/components';
import CustomImage from '../CustomImage';
import './HeadlineNewsCard.scss';

export default ({
  title,
  subtitle,
  imgUrl,
}: {
  title: string;
  subtitle: string;
  imgUrl: string;
}): JSX.Element => {
  const MAX_SUBTITLE = 100;
  const slicedSubtitle = subtitle.length > MAX_SUBTITLE ? `${subtitle.slice(0, MAX_SUBTITLE)}...` : subtitle;
  return (
    <VCard maxWidth={400} class="news-card">
      <CustomImage lazySrc={imgUrl} customClass="news-card__img" />
      <VCardTitle class="news-card__title">{title}</VCardTitle>
      <VCardSubtitle class="news-card__subtitle">{slicedSubtitle}</VCardSubtitle>
      <div class="news-card__footer">
        <div class="news-card__date">Dec 21, 2021</div>
        <div class="news-card__read">
          Read More<VIcon>mdi-arrow-right</VIcon>
        </div>
      </div>
    </VCard>
  );
};
