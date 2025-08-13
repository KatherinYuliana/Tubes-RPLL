<script setup lang="ts">
defineProps<{
    title: string
    subtitle: string
    ctaText?: string
    ctaTo?: string
    onClick?: ()=> void
}>()

</script>

<template>
    <section class="hero">
        <div class="hero-text">
            <h1>{{ title }}</h1>
            <h3>{{ subtitle }}</h3>
            <button v-if="ctaText && !ctaTo" @click="onClick"> {{ ctaText }}</button>
            <router-link v-if="ctaText && ctaTo" :to="ctaTo" class="cta-button" > {{ ctaText }}</router-link>
        </div>
    </section>
    
</template>

<style scoped>
.hero {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4rem 2rem;
    background: linear-gradient(90deg, #d3ffe8, #aea4e3);
    border-radius: 12px;
    gap: 2rem;
    flex-wrap: wrap;
}

.hero-text {
    flex: 1;
    min-width: 250px;
}

.hero-text h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}
.hero-text h3{
    padding: 0.75rem 1.5rem;
    background-color: black;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}
.cta-button{
  /* padding: 0.75rem 1.5rem; */
  background-color: #ff0057;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;
    
}
.cta-button:hover {
  background-color: #e1004e;
}

</style>
