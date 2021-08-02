<template>
  <div class="loader" flex="justify:center">
    <span
      v-for="(item,index) in list"
      :key="index"
      :style="`animation: ${item} 1.6s linear infinite;`"
    />
  </div>
</template>

<script>
export default {
  name: 'Loading',
  computed: {
    list() {
      const arr = []
      for (let i = 1; i <= 5; i++) {
        arr.push(`loader-item-${i}`)
      }
      return arr
    }
  }
}
</script>

<style lang="scss">
	.loader {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: -10px;
		background-color: $mainBg;
		z-index: 2001;
	
		span {
			position: relative;
			float: left;
			height: 30px;
			width: 5px;
			margin: 100px 2px 0;
			border-radius: 2px;
			background-color: $mainColor;
		}
	}

	@keyframes loader-item-1 {
		1% {
			transform: scaleY(1);
		}

		11% {
			transform: scaleY(1.8);
		}

		21% {
			transform: scaleY(1);
		}

		100% {
			transform: scaleY(1);
		}
	}

	@keyframes loader-item-2 {
		7% {
			transform: scaleY(1);
		}

		17% {
			transform: scaleY(1.8);
		}

		27% {
			transform: scaleY(1);
		}

		100% {
			transform: scaleY(1);
		}
	}

	@keyframes loader-item-3 {
		13% {
			transform: scaleY(1);
		}

		23% {
			transform: scaleY(1.8);
		}

		33% {
			transform: scaleY(1);
		}

		100% {
			transform: scaleY(1);
		}
	}

	@keyframes loader-item-4 {
		19% {
			transform: scaleY(1);
		}

		29% {
			transform: scaleY(1.8);
		}

		39% {
			transform: scaleY(1);
		}

		100% {
			transform: scaleY(1);
		}
	}

	@keyframes loader-item-5 {
		25% {
			transform: scaleY(1);
		}

		35% {
			transform: scaleY(1.8);
		}

		45% {
			transform: scaleY(1);
		}

		100% {
			transform: scaleY(1);
		}
	}

	// @keyframes loader-item-6 {
	//     31% {
	//         transform: scaleY(1);
	//     }
	//     41% {
	//         transform: scaleY(1.8);
	//     }
	//     51% {
	//         transform: scaleY(1);
	//     }
	//     100% {
	//         transform: scaleY(1);
	//     }
	// }
	// @keyframes loader-item-7 {
	//     37% {
	//         transform: scaleY(1);
	//     }
	//     47% {
	//         transform: scaleY(1.8);
	//     }
	//     57% {
	//         transform: scaleY(1);
	//     }
	//     100% {
	//         transform: scaleY(1);
	//     }
	// }
	// @keyframes loader-item-8 {
	//     43% {
	//         transform: scaleY(1);
	//     }
	//     53% {
	//         transform: scaleY(1.8);
	//     }
	//     63% {
	//         transform: scaleY(1);
	//     }
	//     100% {
	//         transform: scaleY(1);
	//     }
	// }
	// @keyframes loader-item-9 {
	//     49% {
	//         transform: scaleY(1);
	//     }
	//     59% {
	//         transform: scaleY(1.8);
	//     }
	//     69% {
	//         transform: scaleY(1);
	//     }
	//     100% {
	//         transform: scaleY(1);
	//     }
	// }
	// @keyframes loader-item-10 {
	//     55% {
	//         transform: scaleY(1);
	//     }
	//     65% {
	//         transform: scaleY(1.8);
	//     }
	//     75% {
	//         transform: scaleY(1);
	//     }
	//     100% {
	//         transform: scaleY(1);
	//     }
	// }
</style>
