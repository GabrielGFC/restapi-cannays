<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import EmptyState from '@/components/shared/EmptyState.vue';
</script>

<template>
    <PageHeader title="Histórico de interações" subtitle="Thread médico ↔ farmacêutico" />
    <EmptyState
        title="Sem histórico"
        description="As mensagens entre médicos e farmacêuticos aparecerão aqui."
    />
</template>
