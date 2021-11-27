<template>
    <div >
        {{ this.activityInfo }}
    </div>
</template>

<script>
export default {
    name: Activity,
    props: {
        activityInfo: Object,
    }
}
</script>