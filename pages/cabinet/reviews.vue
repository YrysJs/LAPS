<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useMainStore } from '~/store/useMainStore'
import { useUserStore } from '~/store/useUserStore'
import Pagination from '~/components/layout/pagination.vue'

definePageMeta({
  middleware: 'cabinet'
})

const mainStore = useMainStore()
const userStore = useUserStore()

const currentPage = ref(1)
const totalPages = ref(1)
const loading = ref(false)
const reviews = ref([])
const userRole = computed(() => userStore.user.role)

// For specialist response
const selectedReviewId = ref(null)
const responseText = ref('')
const submittingResponse = ref(false)

const expandedReviews = ref({});
const showingReplies = ref({});
const replies = ref({});
const loadingReplies = ref({});

// Get current user info
onMounted(async () => {
  if (!userStore.user.id) {
    await userStore.getUserInfo()
  }
  
  // For specialists, we need to load their specialist profile info
  if (userRole.value === 'specialist' && (!userStore.specialistsMainInfo || !userStore.specialistsMainInfo.id)) {
    await userStore.getSpecialistInfo()
  }
  
  fetchReviews()
})

watch(currentPage, () => {
  fetchReviews()
})

// Fetch reviews based on user role
async function fetchReviews() {
  loading.value = true
  
  try {
    const params = {
      page: currentPage.value,
      limit: 10
    }

    // We need to ensure specialist_id is always included as it's required
    if (userRole.value === 'specialist') {
      // For specialists, get reviews about them
      params.specialist_id = userStore.specialistsMainInfo.id
    } else {
      // For clients or any other role, we still need to provide specialist_id
      // We'll get the specialist_id from specialistsMainInfo if available
      // This assumes we've loaded specialistsMainInfo earlier
      if (userStore.specialistsMainInfo && userStore.specialistsMainInfo.id) {
        params.specialist_id = userStore.specialistsMainInfo.id
      } else {
        // If we don't have a specialist ID yet, we need to fetch specialist info first
        await userStore.getSpecialistInfo()
        params.specialist_id = userStore.specialistsMainInfo.id
      }
      
      // For clients, we might also want to filter by client_id
      if (userRole.value === 'client') {
        params.client_id = userStore.user.id
      }
    }

    // Make sure we have a specialist_id before making the request
    if (!params.specialist_id) {
      console.error('Missing required parameter: specialist_id')
      return
    }

    await mainStore.getReviews(params)
    
    // Handle the reviews data according to the API response structure
    reviews.value = Array.isArray(mainStore.reviews) 
      ? mainStore.reviews 
      : (mainStore.reviews?.data || [])
    
    // If the response contains pagination info, use it
    if (mainStore.reviews && typeof mainStore.reviews === 'object' && mainStore.reviews.total_pages) {
      totalPages.value = mainStore.reviews.total_pages
    } else {
      // If we don't have pagination info, assume we have only one page
      totalPages.value = 1
    }
  } catch (error) {
    console.error('Error fetching reviews:', error)
  } finally {
    loading.value = false
  }
}

// Format date to YYYY-MM-DD
function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.getFullYear() + '-' + 
         String(date.getMonth() + 1).padStart(2, '0') + '-' + 
         String(date.getDate()).padStart(2, '0')
}

// Function to fetch and display reply for a review
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

// Function to toggle text expansion
function toggleExpand(reviewId) {
  expandedReviews.value[reviewId] = !expandedReviews.value[reviewId];
}

// For specialists to respond to reviews
function openResponseForm(reviewId) {
  selectedReviewId.value = reviewId
  responseText.value = ''
}

function closeResponseForm() {
  selectedReviewId.value = null
  responseText.value = ''
}

async function submitResponse() {
  if (!responseText.value.trim() || !selectedReviewId.value) return
  
  submittingResponse.value = true
  
  try {
    await mainStore.addRevuewReplies(selectedReviewId.value, {
      text: responseText.value
    })
    
    // Refresh reviews after adding a response
    fetchReviews()
    closeResponseForm()
  } catch (error) {
    console.error('Error submitting response:', error)
  } finally {
    submittingResponse.value = false
  }
}
</script>

<template>
  <NuxtLayout name="cabinet">
    <div class="reviews-page">
      <h1 class="reviews-page__title">
        {{ userRole === 'specialist' ? 'Отзывы о вас' : 'Ваши отзывы' }}
      </h1>
      
      <div v-if="loading" class="reviews-page__loading">
        Загрузка отзывов...
      </div>
      
      <div v-else-if="reviews.length === 0" class="reviews-page__empty">
        {{ userRole === 'specialist' ? 'Пока нет отзывов о вас' : 'Вы еще не оставили отзывов' }}
      </div>
      
      <div v-else class="reviews">
        <div
          v-for="review in reviews"
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
                <div class="inline-flex items-center">
                  <svg
                    v-for="i in 5"
                    :key="i"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    class="mr-0.2 last:mr-0"
                  >
                    <path
                      :fill="i <= review.rating ? '#f5a623' : '#e0e0e0'"
                      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    />
                  </svg>
                </div>
              </div>
              <div class="date">{{ formatDate(review.created_at) }}</div>
            </div>
            <div class="reviews-bullet">
              <div v-if="review.service_rating">Обслуживание: {{ review.service_rating }}</div>
              <div v-if="review.meeting_efficiency">Эффективность встречи: {{ review.meeting_efficiency }}</div>
              <div v-if="review.professionalism">Профессионализм: {{ review.professionalism }}</div>
              <div v-if="review.price_quality">Цена/Качество: {{ review.price_quality }}</div>
              <div v-if="review.cleanliness">Чистота: {{ review.cleanliness }}</div>
              <div v-if="review.attentiveness">Внимательность: {{ review.attentiveness }}</div>
              <div v-if="review.specialist_experience">Опыт специалиста: {{ review.specialist_experience }}</div>
              <div v-if="review.grammar">Грамотность: {{ review.grammar }}</div>
              <div v-if="review.is_recommended" class="recommended">Рекомендует</div>
            </div>
            <div 
              class="reviews-text"
              :class="{ 'reviews-text--expanded': expandedReviews[review.id] }"
            >
              {{ review.text }}
            </div>
            
            <!-- Show expand button if text is long -->
            <button 
              v-if="review.text && review.text.length > 200" 
              class="reviews-expand-btn"
              @click="toggleExpand(review.id)"
            >
              {{ expandedReviews[review.id] ? 'Свернуть' : 'Развернуть' }}
            </button>
            <br>
            <!-- Show Reply button if review has reply_id -->
            <button
              v-if="review.reply_id"
              class="reviews-reply-btn"
              @click="viewReply(review.id)"
            >
              {{ showingReplies[review.id] ? 'Скрыть ответ' : 'Посмотреть ответ' }}
              <span v-if="loadingReplies[review.id]"> загрузка...</span>
            </button>

            <!-- Reply section -->
            <div 
              v-if="showingReplies[review.id] && replies[review.id]"
              class="reviews-reply">
              <div class="flex justify-between items-center mb-4">
                <h4>Ответ специалиста:</h4>
                <div class="reviews-date" v-if="replies[review.id]">
                  {{ formatDate(replies[review.id].created_at) }}
                </div>
              </div>
              <div 
                v-if="replies[review.id]"
                class="reviews-reply__text"
                :class="{ 'reviews-reply__text--expanded': expandedReviews['reply-'+review.id] }"
              >
                {{ replies[review.id].text }}
              </div>
              
              <button
                v-if="replies[review.id] && replies[review.id].text && replies[review.id].text.length > 100"
                class="reviews-reply__btn"
                @click="toggleExpand('reply-'+review.id)">
                {{ expandedReviews['reply-'+review.id] ? 'Свернуть' : 'Развернуть' }}
              </button>
            </div>

            <!-- Response form for specialists -->
            <div v-if="userRole === 'specialist' && !review.reply_id" class="reviews-actions">
              <button 
                v-if="selectedReviewId !== review.id"
                class="reviews-actions__btn" 
                @click="openResponseForm(review.id)">
                Ответить на отзыв
              </button>
              
              <div v-else class="reviews-response-form">
                <textarea 
                  v-model="responseText"
                  class="reviews-response-form__input"
                  placeholder="Введите ваш ответ"
                  rows="3"></textarea>
                <div class="reviews-response-form__actions">
                  <button 
                    class="reviews-response-form__cancel"
                    @click="closeResponseForm()">
                    Отмена
                  </button>
                  <button 
                    class="reviews-response-form__submit"
                    :disabled="submittingResponse || !responseText.trim()"
                    @click="submitResponse()">
                    {{ submittingResponse ? 'Отправка...' : 'Отправить' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Pagination -->
      <Pagination 
        v-if="totalPages > 1"
        v-model:currentPage="currentPage"
        :totalPages="totalPages"
        :maxPagesToShow="5"
      />
    </div>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.reviews-page {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  
  &__title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    font-size: 32px;
    line-height: 100%;
    letter-spacing: -0.11px;
    margin-bottom: 24px;
  }
  
  &__loading, &__empty {
    padding: 48px;
    text-align: center;
    background: #fff;
    border-radius: 14px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 16px;
    color: #718EBF;
  }
}

.reviews {
  width: 100%;
  background: #fff;
  padding: 24px;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  gap: 24px;

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
    border-radius: 16px;
    border: 1px solid #E5E7EB;
    padding: 17px;
    display: flex;
    gap: 16px;
    align-items: flex-start;
  }

  &-content {
    width: 100%;
    
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
    max-height: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    
    &--expanded {
      max-height: none;
      overflow: visible;
    }
  }
  
  &-expand-btn, &-reply-btn {
    display: inline-block;
    margin-top: 12px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 12.91px;
    line-height: 20px;
    color: #1F72EE;
    cursor: pointer;
    transition: color 0.3s;
    background: none;
    border: none;
    padding: 0;
    
    &:hover {
      color: darken(#1F72EE, 10%);
    }
  }
  
  &-reply {
    margin-top: 16px;
    padding: 16px;
    background: #F9FAFB;
    border-radius: 8px;
    
    h4 {
      font-family: 'Montserrat', sans-serif;
      font-weight: 600;
      font-size: 13px;
      line-height: 16px;
      color: #242424;
    }
    
    &__text {
      font-family: 'Montserrat', sans-serif;
      font-weight: 400;
      font-size: 12.8px;
      line-height: 20px;
      color: #242424;
      max-height: 80px;
      overflow: hidden;
      text-overflow: ellipsis;
      
      &--expanded {
        max-height: none;
        overflow: visible;
      }
    }
    
    &__btn {
      display: inline-block;
      margin-top: 8px;
      font-family: 'Montserrat', sans-serif;
      font-weight: 600;
      font-size: 12px;
      line-height: 20px;
      color: #1F72EE;
      cursor: pointer;
      transition: color 0.3s;
      background: none;
      border: none;
      padding: 0;
      
      &:hover {
        color: darken(#1F72EE, 10%);
      }
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
  
  &-actions {
    margin-top: 16px;
    
    &__btn {
      padding: 8px 16px;
      background: #1F72EE;
      color: white;
      border-radius: 6px;
      font-family: 'Montserrat', sans-serif;
      font-weight: 600;
      font-size: 12px;
      transition: background-color 0.2s;
      
      &:hover {
        background-color: #1a5fc5;
      }
    }
  }
  
  &-response-form {
    &__input {
      width: 100%;
      border: 1px solid #E5E7EB;
      border-radius: 8px;
      padding: 12px;
      font-family: 'Montserrat', sans-serif;
      font-size: 14px;
      margin-bottom: 12px;
      resize: vertical;
    }
    
    &__actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }
    
    &__cancel {
      padding: 8px 16px;
      background: #F1F2F7;
      border-radius: 6px;
      font-family: 'Montserrat', sans-serif;
      font-weight: 600;
      font-size: 12px;
      transition: background-color 0.2s;
      
      &:hover {
        background-color: #e0e0e0;
      }
    }
    
    &__submit {
      padding: 8px 16px;
      background: #1F72EE;
      color: white;
      border-radius: 6px;
      font-family: 'Montserrat', sans-serif;
      font-weight: 600;
      font-size: 12px;
      transition: background-color 0.2s;
      
      &:hover:not(:disabled) {
        background-color: #1a5fc5;
      }
      
      &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }
    }
  }
}
</style>