<script setup lang="ts">
defineProps<{
    columns: { key: string; label: string; class?: string }[];
    rows: Record<string, unknown>[];
}>();
</script>

<template>
    <div class="overflow-hidden rounded-xl ring-1 ring-gray-200 bg-white">
        <div class="overflow-x-auto">
            <table class="w-full text-sm">
                <thead class="bg-gray-50">
                    <tr>
                        <th
                            v-for="col in columns"
                            :key="col.key"
                            class="text-left font-semibold text-xs uppercase tracking-wider text-gray-500 px-4 py-3"
                            :class="col.class"
                        >
                            {{ col.label }}
                        </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    <tr
                        v-for="(row, i) in rows"
                        :key="i"
                        class="hover:bg-gray-50/60 transition"
                    >
                        <td
                            v-for="col in columns"
                            :key="col.key"
                            class="px-4 py-3 text-primary-dark align-middle"
                            :class="col.class"
                        >
                            <slot :name="`cell.${col.key}`" :row="row" :value="row[col.key]">
                                {{ row[col.key] }}
                            </slot>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
