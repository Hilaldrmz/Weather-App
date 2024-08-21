<template>
    <footer class="footer sticky-footer glassmorphism">
        <div class="container">
            <span class="text-muted">© 2022 Weather App. All rights reserved.</span>
        </div>
    </footer>
</template>

<style scoped>
.footer {
    display: flex;
    padding: 10px;
    text-align: center;
    width: 50dvw;
    border-radius: 45px 45px 0 0;

    z-index: 100;
    transition: 0.4s;
}

.container {
    max-width: 960px;
    margin: 0 auto;
}

.text-muted {
    color: whitesmoke;
}
</style>
