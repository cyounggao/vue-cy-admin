/**
 * path 菜单的路径
 * filePath  菜单文件的位置 ，用'/'分割成数组，最后一项作为路由name
 * title 菜单的中文名称
 * icon 菜单的图标
 * show 菜单是否显示
 * notAllowed 菜单是否无权限
 * children 子菜单
 */
export default [{
	path: '/demo',
	filePath: '/demo',
	title: '示例',
	icon: 'el-icon-folder-opened',
	show: true,
	children: [{
		path: '/video',
		filePath: '/demo/anchor',
		title: '锚点导航',
		icon: 'el-icon-bottom-right',
		show: true,
		children: []
	}]
}]
