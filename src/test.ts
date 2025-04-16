import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

const __main = () => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    // 在 HTML 中添加准星样式
    const crosshair = document.createElement("div")
    crosshair.style.position = "fixed"
    crosshair.style.top = "50%"
    crosshair.style.left = "50%"
    crosshair.style.width = "10px"
    crosshair.style.height = "10px"
    crosshair.style.backgroundColor = "red"
    crosshair.style.borderRadius = "50%"
    crosshair.style.transform = "translate(-50%, -50%)"
    document.body.appendChild(crosshair)

    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)
    scene.background = new THREE.Color("white")

    camera.position.z = 5

    // 添加键盘事件监听器
    const handleKeyDown = (event: KeyboardEvent) => {
        const step = 0.5 // 摄像头移动的步长
        switch (event.key) {
            case "w":
                camera.position.y += step
                break
            case "s":
                camera.position.y -= step
                break
            case "a":
                camera.position.x -= step
                break
            case "d":
                camera.position.x += step
                break
        }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("click", (event) => {
        // 将鼠标屏幕坐标转换为归一化设备坐标 (NDC)
        const mouse = new THREE.Vector2(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1
        )

        // 创建射线投射器
        const raycaster = new THREE.Raycaster()
        raycaster.setFromCamera(mouse, camera)

        // 计算射线与场景中物体的交点
        const intersects = raycaster.intersectObjects(scene.children)

        // 如果有交点，使用第一个交点的位置；否则使用射线方向上的一个点
        const position =
            intersects.length > 0
                ? intersects[0].point
                : raycaster.ray.origin
                      .clone()
                      .add(raycaster.ray.direction.clone().multiplyScalar(5))

        // 创建方块并设置位置
        const geometry = new THREE.BoxGeometry()
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
        const cube = new THREE.Mesh(geometry, material)
        cube.position.copy(position)
        scene.add(cube)
    })
    // 鼠标移动事件监听器
    window.addEventListener("mousemove", (event) => {
        const x = (event.clientX / window.innerWidth) * 2 - 1
        const y = -(event.clientY / window.innerHeight) * 2 + 1

        // 更新准星位置
        crosshair.style.left = `${event.clientX}px`
        crosshair.style.top = `${event.clientY}px`

        // 更新摄像头方向
        camera.lookAt(new THREE.Vector3(x * 5, y * 5, 0))
    })

    const animate = () => {
        requestAnimationFrame(animate)
        cube.rotation.x += 0.01
        cube.rotation.y += 0.01
        renderer.render(scene, camera)
    }

    animate()
}

__main()
