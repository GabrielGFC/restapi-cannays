<script setup lang="ts">
defineProps<{
    columns: { key: string; label: string }[];
    rows: Record<string, unknown>[];
}>();
</script>

<template>
    <div class="overflow-x-auto rounded-lg border border-divider">
        <table class="w-full text-sm">
            <thead class="bg-primary-light text-ink">
                <tr>
                    <th
                        v-for="col in columns"
                        :key="col.key"
                        class="text-left font-semibold px-4 py-3"
                    >
                        {{ col.label }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(row, i) in rows"
                    :key="i"
                    class="border-t border-divider hover:bg-primary-light/40"
                >
                    <td
                        v-for="col in columns"
                        :key="col.key"
                        class="px-4 py-3 text-ink"
                    >
                        <slot :name="`cell.${col.key}`" :row="row" :value="row[col.key]">
                            {{ row[col.key] }}
                        </slot>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
