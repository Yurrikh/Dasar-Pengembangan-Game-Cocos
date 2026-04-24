System.register("chunks:///_virtual/Bird.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(e){var t,i,r,o,n,s,l,a,p,c,h,u,d;return{setters:[function(e){t=e.applyDecoratedDescriptor,i=e.inheritsLoose,r=e.createForOfIteratorHelperLoose,o=e.initializerDefineProperty,n=e.assertThisInitialized},function(e){s=e.cclegacy,l=e._decorator,a=e.SpriteFrame,p=e.Sprite,c=e.Vec3,h=e.Collider2D,u=e.Contact2DType,d=e.Component}],execute:function(){var g,m,v,f,b,y,C,T,w;s._RF.push({},"ccdbesM1FpAr6dqxO1k9w1f","Bird",void 0);var R=l.ccclass,B=l.property;e("Bird",(g=R("Bird"),m=B({type:a}),v=B({type:a}),f=B({type:a}),g((C=t((y=function(e){function t(){for(var t,i=arguments.length,r=new Array(i),s=0;s<i;s++)r[s]=arguments[s];return t=e.call.apply(e,[this].concat(r))||this,o(t,"spriteBluebird",C,n(t)),o(t,"spriteYellowbird",T,n(t)),o(t,"spriteRedbird",w,n(t)),t.listToRemove=[],t.level=1,t.merging=!1,t}i(t,e);var s=t.prototype;return s.resetToDefault=function(){this.level=1,this.merging=!1,this.listToRemove=[],this.getComponent(p).spriteFrame=this.spriteBluebird,this.node.setScale(new c(1,1,1))},s.start=function(){var e=this.getComponent(h);e&&(e.on(u.BEGIN_CONTACT,this.onBeginContact,this),e.on(u.END_CONTACT,this.onEndContact,this))},s.onBeginContact=function(e,i,r){if(!this.merging){var o=i.node.getComponent(t);o&&!o.merging&&e.group===i.group&&this.level===o.level&&(this.merging=!0,o.merging=!0,this.levelUp(),this.listToRemove.push(i.node))}},s.onEndContact=function(e,t,i){},s.levelUp=function(){switch(this.level++,console.log("level: "+this.level),this.level){case 2:this.getComponent(p).spriteFrame=this.spriteYellowbird,this.node.setScale(new c(1.5,1.5,1));break;case 3:this.getComponent(p).spriteFrame=this.spriteRedbird,this.node.setScale(new c(2,2,1));break;case 4:this.listToRemove.push(this.node)}},s.update=function(e){if(this.listToRemove.length>0){for(var t,i=r(this.listToRemove);!(t=i()).done;){t.value.destroy()}this.listToRemove=[],this.merging=!1}},t}(d)).prototype,"spriteBluebird",[m],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),T=t(y.prototype,"spriteYellowbird",[v],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),w=t(y.prototype,"spriteRedbird",[f],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),b=y))||b));s._RF.pop()}}}));

System.register("chunks:///_virtual/GameController.ts",["./rollupPluginModLoBabelHelpers.js","cc","./Bird.ts"],(function(t){var e,i,r,o,n,a,s,c,l,p,u,d,h,y;return{setters:[function(t){e=t.applyDecoratedDescriptor,i=t.inheritsLoose,r=t.initializerDefineProperty,o=t.assertThisInitialized},function(t){n=t.cclegacy,a=t._decorator,s=t.Node,c=t.input,l=t.Input,p=t.instantiate,u=t.RigidBody2D,d=t.ERigidBody2DType,h=t.Component},function(t){y=t.Bird}],execute:function(){var f,v,T,b,m;n._RF.push({},"19721ezRxRIhK8YRDeJRyPG","GameController",void 0);var g=a.ccclass,C=a.property;t("GameController",(f=g("GameController"),v=C({type:s}),f((m=e((b=function(t){function e(){for(var e,i=arguments.length,n=new Array(i),a=0;a<i;a++)n[a]=arguments[a];return e=t.call.apply(t,[this].concat(n))||this,r(e,"bird",m,o(e)),e}i(e,t);var n=e.prototype;return n.start=function(){this.bird.active=!1,c.off(l.EventType.TOUCH_START,this.onTouchStart,this),c.on(l.EventType.TOUCH_START,this.onTouchStart,this)},n.onTouchStart=function(t){if(this.bird){var e=t.getUILocation();this.bird.active=!0;var i=p(this.bird);this.bird.active=!1,this.bird.parent.addChild(i);var r=i.getComponent(y);r&&r.resetToDefault(),i.setWorldPosition(e.x,e.y,0);var o=i.getComponent(u);o&&(o.type=d.Dynamic,o.wakeUp())}else console.error("Bird template is missing!")},n.update=function(t){},e}(h)).prototype,"bird",[v],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),T=b))||T));n._RF.pop()}}}));

System.register("chunks:///_virtual/main",["./Bird.ts","./GameController.ts"],(function(){return{setters:[null,null],execute:function(){}}}));

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});