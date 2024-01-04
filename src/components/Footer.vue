<template>
    <footer class="footer sticky-footer">
        <div class="container">
            <span class="text-muted">© 2022 Weather App. All rights reserved.</span>
        </div>
    </footer>
</template>

<style scoped>
.footer {
    display: flex;
    background-color: #00000036;
    padding: 10px;
    text-align: center;

    z-index: 100;
}

.container {
    max-width: 960px;
    margin: 0 auto;
}

.text-muted {
    color: #6c757d;
}
</style>
