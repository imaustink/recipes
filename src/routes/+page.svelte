<script>
    import "../app.css";
    import { onMount } from 'svelte';
    import { getSessionToken } from "../authentication";
    import { saveWipData, getWipData, destroyWipData } from "../work-in-progress";

    
    let loading = false;
    let title;
    let ingredients;
    let directions;
    let tags;

    onMount(async () => {
      const wipData = getWipData();
      title = wipData.title;
      tags = wipData.tags?.join(",");
      ingredients = new SimpleMDE({ element: document.getElementById("Ingredients"), status: false });
      directions = new SimpleMDE({ element: document.getElementById("Directions"), status: false });
      if (wipData.ingredients) ingredients.value(wipData.ingredients);
      if (wipData.directions) directions.value(wipData.directions);
    });

    async function createRecipe(body) {
      const authToken = getSessionToken();
      const myHeaders = new Headers({
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
      });
      const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(body)
      };

      const request = await fetch("https://recipes-api.kurpuis.com/recipes", requestOptions);
      const response = await request.json();
      window.location.href = "/admin/success";
    }

    function handleSubmit(event) {
      event.preventDefault();
      loading = true;
      const recipe = {
        title,
        ingredients: ingredients.value(),
        directions: directions.value(),
        tags: tags.split(",")
      };
      saveWipData(recipe);
      createRecipe(recipe).catch((error) => {
        alert(error.message);
      }).finally(() => {
        loading = false;
        destroyWipData();
      });
    }

</script>

<div class="relative mx-auto mt-10 w-full max-w-container px-4 sm:px-6 lg:px-8">
  <div class="lg:flex lg:items-center lg:justify-between">
    <div class="min-w-0 flex-1">
      <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Create Recipe</h2>
      <div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
        <div class="mt-2 flex items-center text-sm text-gray-500">
          This information will be displayed publicly so be careful what you share.
        </div>
      </div>
    </div>
  </div>

  <div class="md:grid md:grid-cols-3 md:gap-6 mt-10">
    <div class="mt-5 md:col-span-3 md:mt-0">
      <form action="#" method="POST" on:submit={handleSubmit}>
        <div class="shadow sm:overflow-hidden sm:rounded-md">
          <div class="space-y-6 bg-white px-4 py-5 sm:p-6">
            <div class="col-span-3 sm:col-span-3">
              <label for="company-website" class="block text-sm font-medium text-gray-700">Title</label>
              <div class="mt-1 flex shadow-sm">
                <input bind:value={title} type="text" name="company-website" class="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Pork Banh Mi Tacos" />
              </div>
            </div>
          </div>
          <div class="space-y-6 bg-white px-4 py-5 sm:p-6">
            <div>
              <label for="about" class="block text-sm font-medium text-gray-700">Ingredients</label>
              <div class="mt-1">
                  <textarea id="Ingredients" name="about" rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
              <p class="mt-2 text-sm text-gray-500">List the ingredients needed to make this recipe.</p>
            </div>
          </div>
          <div class="space-y-6 bg-white px-4 py-5 sm:p-6">
            <div>
              <label for="about" class="block text-sm font-medium text-gray-700">Directions</label>
              <div class="mt-1">
                  <textarea id="Directions" name="about" rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
              <p class="mt-2 text-sm text-gray-500">Describe the steps to make this recipe.</p>
            </div>
          </div>
          <div class="space-y-6 bg-white px-4 py-5 sm:p-6">
            <div class="col-span-3 sm:col-span-3">
              <label for="company-website" class="block text-sm font-medium text-gray-700">Tags</label>
              <div class="mt-1 flex shadow-sm">
                <input bind:value={tags} type="text" name="company-website" class="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="asian, fusion, pork, tacos" />
              </div>
              <p class="mt-2 text-sm text-gray-500">Describe the steps to make this recipe.</p>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button disabled='{loading}' type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              {#if loading}
                Loading...
              {:else}
                Save
              {/if}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>