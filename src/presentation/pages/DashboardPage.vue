<template>
  <section>
    <h3>{{ title }}</h3>
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
    <h3>Heading 3</h3>
    <h4>Heading 4</h4>
    <h5>Heading 5</h5>
    <h6>Heading 6</h6>
    <p>This is a paragraph.</p>
    <p>This is another paragraph.</p>
    <p>
      This paragraph contains a lot of lines in the source code, but the browser
      ignores it.
    </p>

    <p>
      This paragraph contains a lot of spaces in the source code, but the
      browser ignores it.
    </p>

    <h2>An Unordered HTML List</h2>

    <ul>
      <li>Coffee</li>
      <li>Tea</li>
      <li>Milk</li>
    </ul>

    <h2>An Ordered HTML List</h2>

    <ol>
      <li>Coffee</li>
      <li>Tea</li>
      <li>Milk</li>
    </ol>

    <dl>
      <dt>Coffee</dt>
      <dd>- black hot drink</dd>
      <dt>Milk</dt>
      <dd>- white cold drink</dd>
    </dl>

    <h3>{{ title }}</h3>
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
    <h3>Heading 3</h3>
    <h4>Heading 4</h4>
    <h5>Heading 5</h5>
    <h6>Heading 6</h6>
    <p>This is a paragraph.</p>
    <p>This is another paragraph.</p>
    <p>
      This paragraph contains a lot of lines in the source code, but the browser
      ignores it.
    </p>

    <p>
      This paragraph contains a lot of spaces in the source code, but the
      browser ignores it.
    </p>

    <h2>An Unordered HTML List</h2>

    <ul>
      <li>Coffee</li>
      <li>Tea</li>
      <li>Milk</li>
    </ul>

    <h2>An Ordered HTML List</h2>

    <ol>
      <li>Coffee</li>
      <li>Tea</li>
      <li>Milk</li>
    </ol>

    <dl>
      <dt>Coffee</dt>
      <dd>- black hot drink</dd>
      <dt>Milk</dt>
      <dd>- white cold drink</dd>
    </dl>
  </section>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { facade } from "~/main";
const title = computed(() => facade.stores.t.dashboard);
const props = defineProps<{}>();
const name = "Dashboard";
</script>

<style lang="scss" scoped></style>
