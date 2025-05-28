<script setup>
import { ref } from 'vue';
import Rating from './rating.vue';
import { useMainStore  } from '~/store/useMainStore'
const mainStore = useMainStore()
// const userStore = useUserStore()

const reviews = computed(() => {
  return mainStore.reviews
})

// Track which reviews have expanded text
const expandedReviews = ref({});
// Track which reviews are showing replies
const showingReplies = ref({});
// Store replies for each review
const replies = ref({});
// Loading states for replies
const loadingReplies = ref({});

function toggleExpand(reviewId) {
  expandedReviews.value[reviewId] = !expandedReviews.value[reviewId];
}

async function viewReply(reviewId) {
  if (showingReplies.value[reviewId]) {
    // If already showing, just hide
    showingReplies.value[reviewId] = false;
    return;
  }
  
  // Set loading state
  loadingReplies.value[reviewId] = true;
  
  try {
    // Fetch the reply from the API
    const replyData = await mainStore.getReplyById(reviewId);
    if (replyData && replyData.length > 0) {
      replies.value[reviewId] = replyData[0]; // API returns an array, use first item
      showingReplies.value[reviewId] = true;
    }
  } catch (error) {
    console.error('Error fetching reply:', error);
  } finally {
    loadingReplies.value[reviewId] = false;
  }
}

// Format date to YYYY-MM-DD
function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.getFullYear() + '-' + 
         String(date.getMonth() + 1).padStart(2, '0') + '-' + 
         String(date.getDate()).padStart(2, '0');
}
</script>

<template>
  <div class="reviews">
    <div
      v-for="review of reviews"
      :key="review.id"
      class="reviews-item">
      <div class="reviews-avatar">
        <img
          src="/images/avator-none.jpg"
          alt="avatar" >
      </div>
      <div class="reviews-content">
        <div class="reviews-content__top">
          <div>
            <h3>{{ review.client_name }}</h3>
            <Rating
              :rating="review.rating"
              color="#1F72EE" />
          </div>
          <div class="date">{{ formatDate(review.created_at) }}</div>
        </div>
        <div class="reviews-bullet">
          <div v-if="review.service_rating">{{ $t('reviews.service_rating') }}: {{ review.service_rating }}</div>
          <div v-if="review.meeting_efficiency">{{ $t('reviews.meeting_efficiency') }}: {{ review.meeting_efficiency }}</div>
          <div v-if="review.professionalism">{{ $t('reviews.professionalism') }}: {{ review.professionalism }}</div>
          <div v-if="review.price_quality">{{ $t('reviews.price_quality') }}: {{ review.price_quality }}</div>
          <div v-if="review.cleanliness">{{ $t('reviews.cleanliness') }}: {{ review.cleanliness }}</div>
          <div v-if="review.attentiveness">{{ $t('reviews.attentiveness') }}: {{ review.attentiveness }}</div>
          <div v-if="review.specialist_experience">{{ $t('reviews.specialist_experience') }}: {{ review.specialist_experience }}</div>
          <div v-if="review.grammar">{{ $t('reviews.grammar') }}: {{ review.grammar }}</div>
          <div v-if="review.is_recommended" class="recommended">{{ $t('reviews.recommend') }}</div>
        </div>
        <div class="reviews-text">
          {{ review.text }}
        </div>

        <!-- Show Reply button if review has reply_id -->
        <button
          v-if="review.reply_id"
          class="reviews-reply-btn"
          @click="viewReply(review.id)">
          {{ showingReplies[review.id] ? $t('reviews.hide_reply') : $t('reviews.show_reply') }}
          <span v-if="loadingReplies[review.id]">{{ $t('reviews.loading_reply') }}</span>
        </button>

        <!-- Reply section -->
        <div 
          v-if="showingReplies[review.id] && replies[review.id]"
          class="reviews-send">
          <div class="flex justify-between items-center mb-4">
            <h4>{{ $t('reviews.specialist_reply') }}:</h4>
            <div class="reviews-date" v-if="replies[review.id]">
              {{ formatDate(replies[review.id].created_at) }}
            </div>
          </div>
          <div 
            v-if="replies[review.id]"
            class="reviews-text reviews-send__text"
            :class="{ 'reviews-send__text--expanded': expandedReviews[review.id] }"
          >
            {{ replies[review.id].text }}
          </div>
          
          <button
            v-if="replies[review.id] && replies[review.id].text && replies[review.id].text.length > 100"
            class="reviews-send__btn"
            @click="toggleExpand(review.id)">
            {{ expandedReviews[review.id] ? $t('reviews.collapse') : $t('reviews.expand') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<style lang="scss" scoped>
.review-form {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;

  h3 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    font-size: 24.38px;
    line-height: 24px;
    margin-bottom: 24px;
  }
}
.review-form__wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.form-row {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
}
.form-row label {
  width: 200px;
  font-weight: 500;
}
.form-row textarea {
  flex: 1;
}


.reviews {
  width: 100%;
  background: #fff;
  padding: 24px;

  &-avatar {
    min-width: 44px;
    height: 44px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  
  &-item {
    border-radius: 0px 0px 20px 20px;
    border: 1px solid #E5E7EB;
    border-radius: 16px;
    padding: 17px;

    display: flex;
    gap: 16px;
    align-items: flex-start;
  }

  &-content {
    &__top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      h3 {
        font-family: 'Montserrat', sans-serif;
        font-weight: 700;
        font-size: 14.38px;
        line-height: 24px;
      }

      .date {
        font-family: 'Montserrat', sans-serif;
        font-weight: 400;
        font-size: 11.44px;
        line-height: 16px;
        color: #6B7280;
      }
    }
  }

  &-bullet {
    padding-top: 16px;
    padding-bottom: 24px;

    display: flex;
    flex-wrap: wrap;
    gap: 16px;

    div {
      padding: 5px 8px;
      border-radius: 12px;
      background: #F1F2F7;

      font-family: 'Montserrat', sans-serif;
      font-weight: 400;
      font-size: 12.91px;
      line-height: 20px;

      width: fit-content;
    }
    
    .recommended {
      background: #E6F2FF;
      color: #1F72EE;
      font-weight: 600;
    }
  }


  &-text {
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    font-size: 12.8px;
    line-height: 20px;
    color: #242424;
  }

  &-reply-btn {
    margin-top: 12px;
    display: inline-block;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 12.91px;
    line-height: 20px;
    color: #1F72EE;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: darken(#1F72EE, 10%);
    }
  }

  &-send {
    margin-top: 12px;
    
    >h4 {
      padding-top: 10px;
      padding-bottom: 14px;
      font-family: 'Montserrat', sans-serif;
      font-weight: 600;
      font-size: 13px;
      line-height: 16px;
      color: #242424;
    }

    &__text {
      max-width: 600px;
      width: 100%;
      max-height: 50px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &__text--expanded {
      max-height: none;
      overflow: visible;
    }

    button {
      margin-top: 14px;
      font-family: 'Montserrat', sans-serif;
      font-weight: 400;
      font-size: 12.91px;
      line-height: 20px;
      color: #1F72EE;
      cursor: pointer;
    }
  }

  &-date {
    margin-top: 8px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    font-size: 11.44px;
    line-height: 16px;
    color: #6B7280;
  }
}

@media (max-width: 610px) {
  .specialist__list-item__left {
    flex-direction: column;
    align-items: center;
    text-align: center;

    * {
      width: fit-content;
      margin: 5px auto;
    }
  }
  .specialist__list-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      margin: 0;
    }
  }
  .specialist__list-shedule {
    margin-top: 30px;
  }
  .profile__content {
    padding: 20px 10px;
  }
  .profile__tabs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;

    button {
      height: initial;
    }
  }
  .reviews-avatar {
    display: none !important;
  }
}
</style>
  