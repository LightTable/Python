if(!lt.util.load.provided_QMARK_('lt.plugins.python')) {
goog.provide('lt.plugins.python');
goog.require('cljs.core');
goog.require('lt.util.cljs');
goog.require('lt.objs.plugins');
goog.require('lt.objs.files');
goog.require('lt.objs.platform');
goog.require('lt.objs.popup');
goog.require('lt.objs.dialogs');
goog.require('lt.objs.popup');
goog.require('lt.objs.notifos');
goog.require('lt.objs.proc');
goog.require('lt.objs.notifos');
goog.require('clojure.string');
goog.require('lt.util.cljs');
goog.require('lt.objs.command');
goog.require('lt.objs.platform');
goog.require('lt.objs.files');
goog.require('lt.objs.clients.tcp');
goog.require('lt.objs.sidebar.clients');
goog.require('lt.objs.plugins');
goog.require('lt.plugins.watches');
goog.require('lt.objs.eval');
goog.require('lt.objs.clients');
goog.require('lt.objs.clients.tcp');
goog.require('lt.util.load');
goog.require('clojure.string');
goog.require('lt.plugins.watches');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('lt.object');
goog.require('lt.objs.dialogs');
goog.require('lt.util.load');
goog.require('lt.objs.console');
goog.require('lt.objs.proc');
goog.require('lt.objs.console');
goog.require('lt.objs.eval');
goog.require('lt.objs.clients');
goog.require('lt.objs.sidebar.clients');
goog.require('lt.objs.command');
goog.require('lt.objs.editor');

lt.plugins.python.shell = lt.util.load.node_module.call(null,"shelljs");

lt.plugins.python.py_path = lt.objs.files.join.call(null,lt.objs.plugins._STAR_plugin_dir_STAR_,"py-src/ltmain.py");

lt.plugins.python.__BEH__on_out = (function __BEH__on_out(this$,data){var out = data.toString();lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"buffer","buffer",3930752946)], null),cljs.core.str,out);
if((out.indexOf("Connected") > -1))
{lt.objs.notifos.done_working.call(null);
return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"connected","connected",4729661051),true], null));
} else
{return null;
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.python","on-out","lt.plugins.python/on-out",772752070),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.python.__BEH__on_out,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"proc.out","proc.out",4302083112),null], null), null));

lt.plugins.python.__BEH__on_error = (function __BEH__on_error(this$,data){var out = data.toString();if((new cljs.core.Keyword(null,"buffer","buffer",3930752946).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)).indexOf("Connected") > -1))
{return null;
} else
{return lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"buffer","buffer",3930752946)], null),cljs.core.str,data);
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.python","on-error","lt.plugins.python/on-error",2440990976),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.python.__BEH__on_error,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"proc.error","proc.error",4143512802),null], null), null));

lt.plugins.python.__BEH__on_exit = (function __BEH__on_exit(this$,data){if(cljs.core.truth_(new cljs.core.Keyword(null,"connected","connected",4729661051).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))))
{} else
{lt.objs.notifos.done_working.call(null);
lt.objs.popup.popup_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"header","header",4087600639),"We couldn't connect.",new cljs.core.Keyword(null,"body","body",1016933652),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1017440956),"Looks like there was an issue trying to connect\n                                                      to the project. Here's what we got:",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pre","pre",1014015509),new cljs.core.Keyword(null,"buffer","buffer",3930752946).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))], null)], null),new cljs.core.Keyword(null,"buttons","buttons",1255256819),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1116631654),"close"], null)], null)], null));
lt.objs.clients.rem_BANG_.call(null,new cljs.core.Keyword(null,"client","client",3951159101).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
}
lt.objs.proc.kill_all.call(null,new cljs.core.Keyword(null,"procs","procs",1120844623).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
return lt.object.destroy_BANG_.call(null,this$);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.python","on-exit","lt.plugins.python/on-exit",954908882),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.python.__BEH__on_exit,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"proc.exit","proc.exit",4162906152),null], null), null));

lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.plugins.python","connecting-notifier","lt.plugins.python/connecting-notifier",2640373121),new cljs.core.Keyword(null,"triggers","triggers",2516997421),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"behaviors","behaviors",607554515),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.plugins.python","on-exit","lt.plugins.python/on-exit",954908882),new cljs.core.Keyword("lt.plugins.python","on-error","lt.plugins.python/on-error",2440990976),new cljs.core.Keyword("lt.plugins.python","on-out","lt.plugins.python/on-out",772752070)], null),new cljs.core.Keyword(null,"init","init",1017141378),(function (this$,client){lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"client","client",3951159101),client,new cljs.core.Keyword(null,"buffer","buffer",3930752946),""], null));
return null;
}));

lt.plugins.python.escape_spaces = (function escape_spaces(s){if(cljs.core._EQ_.call(null,lt.objs.files.separator,"\\"))
{return [cljs.core.str("\""),cljs.core.str(s),cljs.core.str("\"")].join('');
} else
{return s;
}
});

lt.plugins.python.run_py = (function run_py(p__7325){var map__7327 = p__7325;var map__7327__$1 = ((cljs.core.seq_QMARK_.call(null,map__7327))?cljs.core.apply.call(null,cljs.core.hash_map,map__7327):map__7327);var info = map__7327__$1;var venv = cljs.core.get.call(null,map__7327__$1,new cljs.core.Keyword(null,"venv","venv",1017520169));var client = cljs.core.get.call(null,map__7327__$1,new cljs.core.Keyword(null,"client","client",3951159101));var name = cljs.core.get.call(null,map__7327__$1,new cljs.core.Keyword(null,"name","name",1017277949));var project_path = cljs.core.get.call(null,map__7327__$1,new cljs.core.Keyword(null,"project-path","project-path",1907176907));var path = cljs.core.get.call(null,map__7327__$1,new cljs.core.Keyword(null,"path","path",1017337751));var n = lt.objs.notifos.working.call(null,"Connecting..");var obj = lt.object.create.call(null,new cljs.core.Keyword("lt.plugins.python","connecting-notifier","lt.plugins.python/connecting-notifier",2640373121),client);var env = (cljs.core.truth_(venv)?new cljs.core.PersistentArrayMap(null, 1, ["VIRTUAL_ENV",venv], null):cljs.core.PersistentArrayMap.EMPTY);var env__$1 = (cljs.core.truth_(new cljs.core.Keyword(null,"ipython-exe","ipython-exe",2513741372).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.python.python)))?cljs.core.assoc.call(null,env,"LT_IPYTHON_PATH",new cljs.core.Keyword(null,"ipython-exe","ipython-exe",2513741372).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.python.python))):env);return lt.objs.proc.exec.call(null,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"command","command",1964298941),(function (){var or__5799__auto__ = new cljs.core.Keyword(null,"python-exe","python-exe",2215073043).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.python.python));if(cljs.core.truth_(or__5799__auto__))
{return or__5799__auto__;
} else
{var or__5799__auto____$1 = new cljs.core.Keyword(null,"venv-py","venv-py",1361849937).cljs$core$IFn$_invoke$arity$1(info);if(cljs.core.truth_(or__5799__auto____$1))
{return or__5799__auto____$1;
} else
{return "python";
}
}
})(),new cljs.core.Keyword(null,"args","args",1016906831),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.plugins.python.escape_spaces.call(null,lt.plugins.python.py_path),lt.objs.clients.tcp.port,lt.objs.clients.__GT_id.call(null,client)], null),new cljs.core.Keyword(null,"cwd","cwd",1014003170),(function (){var or__5799__auto__ = venv;if(cljs.core.truth_(or__5799__auto__))
{return or__5799__auto__;
} else
{return project_path;
}
})(),new cljs.core.Keyword(null,"env","env",1014004831),env__$1,new cljs.core.Keyword(null,"obj","obj",1014014057),obj], null));
});

lt.plugins.python.check_python = (function check_python(obj){return cljs.core.assoc.call(null,obj,new cljs.core.Keyword(null,"python","python",4335674446),(function (){var or__5799__auto__ = new cljs.core.Keyword(null,"python-exe","python-exe",2215073043).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.python.python));if(cljs.core.truth_(or__5799__auto__))
{return or__5799__auto__;
} else
{var or__5799__auto____$1 = new cljs.core.Keyword(null,"venv-py","venv-py",1361849937).cljs$core$IFn$_invoke$arity$1(obj);if(cljs.core.truth_(or__5799__auto____$1))
{return or__5799__auto____$1;
} else
{return lt.plugins.python.shell.which("python");
}
}
})());
});

lt.plugins.python.check_client = (function check_client(obj){return cljs.core.assoc.call(null,obj,new cljs.core.Keyword(null,"python-client","python-client",3592991054),lt.objs.files.exists_QMARK_.call(null,lt.plugins.python.py_path));
});

lt.plugins.python.find_project = (function find_project(obj){var p = new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(obj);var roots = lt.objs.files.get_roots.call(null);var cur = p;var prev = "";while(true){
if(cljs.core.truth_((function (){var or__5799__auto__ = cljs.core.empty_QMARK_.call(null,cur);if(or__5799__auto__)
{return or__5799__auto__;
} else
{var or__5799__auto____$1 = roots.call(null,cur);if(cljs.core.truth_(or__5799__auto____$1))
{return or__5799__auto____$1;
} else
{return cljs.core._EQ_.call(null,cur,prev);
}
}
})()))
{return cljs.core.assoc.call(null,obj,new cljs.core.Keyword(null,"project-path","project-path",1907176907),null);
} else
{if(cljs.core.truth_((function (){var and__5787__auto__ = cljs.core.not.call(null,lt.objs.files.exists_QMARK_.call(null,lt.objs.files.join.call(null,cur,"__init__.py")));if(and__5787__auto__)
{return lt.objs.files.dir_QMARK_.call(null,cur);
} else
{return and__5787__auto__;
}
})()))
{return cljs.core.assoc.call(null,obj,new cljs.core.Keyword(null,"project-path","project-path",1907176907),cur);
} else
{{
var G__7359 = lt.objs.files.parent.call(null,cur);
var G__7360 = cur;
cur = G__7359;
prev = G__7360;
continue;
}
}
}
break;
}
});

lt.plugins.python.find_venv = (function find_venv(obj){var to_find = (cljs.core.truth_(lt.objs.platform.win_QMARK_.call(null))?"bin\\python":"bin/python");var vpy = lt.objs.files.walk_up_find.call(null,new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(obj),to_find);if(cljs.core.empty_QMARK_.call(null,vpy))
{return obj;
} else
{return cljs.core.assoc.call(null,obj,new cljs.core.Keyword(null,"venv","venv",1017520169),lt.objs.files.parent.call(null,lt.objs.files.parent.call(null,vpy)),new cljs.core.Keyword(null,"venv-py","venv-py",1361849937),vpy);
}
});

lt.plugins.python.notify = (function notify(obj){var map__7329 = obj;var map__7329__$1 = ((cljs.core.seq_QMARK_.call(null,map__7329))?cljs.core.apply.call(null,cljs.core.hash_map,map__7329):map__7329);var client = cljs.core.get.call(null,map__7329__$1,new cljs.core.Keyword(null,"client","client",3951159101));var python_client = cljs.core.get.call(null,map__7329__$1,new cljs.core.Keyword(null,"python-client","python-client",3592991054));var path = cljs.core.get.call(null,map__7329__$1,new cljs.core.Keyword(null,"path","path",1017337751));var project_path = cljs.core.get.call(null,map__7329__$1,new cljs.core.Keyword(null,"project-path","project-path",1907176907));var python = cljs.core.get.call(null,map__7329__$1,new cljs.core.Keyword(null,"python","python",4335674446));if((cljs.core.not.call(null,python)) || (cljs.core.empty_QMARK_.call(null,python)))
{lt.objs.clients.rem_BANG_.call(null,client);
lt.objs.notifos.done_working.call(null);
lt.objs.popup.popup_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"header","header",4087600639),"We couldn't find Python.",new cljs.core.Keyword(null,"body","body",1016933652),"In order to evaluate in Python files, a Python interpreter has to be installed and on your system PATH.",new cljs.core.Keyword(null,"buttons","buttons",1255256819),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1116631654),"Download Python",new cljs.core.Keyword(null,"action","action",3885920680),(function (){return lt.objs.platform.open.call(null,"http://www.python.org/download/");
})], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1116631654),"ok"], null)], null)], null));
} else
{if(cljs.core.not.call(null,project_path))
{lt.objs.clients.rem_BANG_.call(null,client);
lt.objs.notifos.done_working.call(null);
lt.objs.popup.popup_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"header","header",4087600639),"We couldn't find this file.",new cljs.core.Keyword(null,"body","body",1016933652),"In order to evaluate in Python files, the file has to be on disk somewhere.",new cljs.core.Keyword(null,"buttons","buttons",1255256819),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1116631654),"Save this file",new cljs.core.Keyword(null,"action","action",3885920680),(function (){lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"save","save",1017427183));
return lt.plugins.python.try_connect.call(null,obj);
})], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1116631654),"Cancel",new cljs.core.Keyword(null,"action","action",3885920680),(function (){return null;
})], null)], null)], null));
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{lt.plugins.python.run_py.call(null,obj);
} else
{}
}
}
return obj;
});

lt.plugins.python.check_all = (function check_all(obj){return lt.plugins.python.notify.call(null,lt.plugins.python.find_project.call(null,lt.plugins.python.check_client.call(null,lt.plugins.python.check_python.call(null,lt.plugins.python.find_venv.call(null,obj)))));
});

lt.plugins.python.try_connect = (function try_connect(p__7330){var map__7332 = p__7330;var map__7332__$1 = ((cljs.core.seq_QMARK_.call(null,map__7332))?cljs.core.apply.call(null,cljs.core.hash_map,map__7332):map__7332);var info = cljs.core.get.call(null,map__7332__$1,new cljs.core.Keyword(null,"info","info",1017141280));var path = new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(info);var client = lt.objs.clients.client_BANG_.call(null,new cljs.core.Keyword(null,"python.client","python.client",4480494735));lt.plugins.python.check_all.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"path","path",1017337751),path,new cljs.core.Keyword(null,"client","client",3951159101),client], null));
return client;
});

lt.plugins.python.python_watch = (function python_watch(meta,src){var meta__$1 = JSON.stringify(cljs.core.clj__GT_js.call(null,meta));return [cljs.core.str("sys.modules['lttools'].__dict__['watch']("),cljs.core.str(src),cljs.core.str(", "),cljs.core.str(meta__$1),cljs.core.str(")")].join('');
});

lt.plugins.python.__BEH__watch_src = (function __BEH__watch_src(editor,cur,meta,src){return lt.plugins.python.python_watch.call(null,meta,src);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.python","watch-src","lt.plugins.python/watch-src",2045360236),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.python.__BEH__watch_src,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"watch.src+","watch.src+",868749304),null], null), null));

lt.plugins.python.__BEH__on_eval = (function __BEH__on_eval(editor){return lt.object.raise.call(null,lt.plugins.python.python,new cljs.core.Keyword(null,"eval!","eval!",1110791799),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"origin","origin",4300251800),editor,new cljs.core.Keyword(null,"info","info",1017141280),cljs.core.assoc.call(null,cljs.core.deref.call(null,editor).call(null,new cljs.core.Keyword(null,"info","info",1017141280)),new cljs.core.Keyword(null,"code","code",1016963423),lt.plugins.watches.watched_range.call(null,editor,null,null,lt.plugins.python.python_watch))], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.python","on-eval","lt.plugins.python/on-eval",954914896),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.python.__BEH__on_eval,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"eval","eval",1017029646),null], null), null));

lt.plugins.python.__BEH__on_eval__DOT__one = (function __BEH__on_eval__DOT__one(editor){var code = lt.plugins.watches.watched_range.call(null,editor,null,null,lt.plugins.python.python_watch);var pos = lt.objs.editor.__GT_cursor.call(null,editor);var info = new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,editor));var info__$1 = (cljs.core.truth_(lt.objs.editor.selection_QMARK_.call(null,editor))?cljs.core.assoc.call(null,info,new cljs.core.Keyword(null,"code","code",1016963423),lt.objs.editor.selection.call(null,editor),new cljs.core.Keyword(null,"meta","meta",1017252215),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"start","start",1123661780),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_cursor.call(null,editor,"start")),new cljs.core.Keyword(null,"end","end",1014004813),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_cursor.call(null,editor,"end"))], null)):cljs.core.assoc.call(null,info,new cljs.core.Keyword(null,"pos","pos",1014015430),pos,new cljs.core.Keyword(null,"code","code",1016963423),code));return lt.object.raise.call(null,lt.plugins.python.python,new cljs.core.Keyword(null,"eval!","eval!",1110791799),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"origin","origin",4300251800),editor,new cljs.core.Keyword(null,"info","info",1017141280),info__$1], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.python","on-eval.one","lt.plugins.python/on-eval.one",4476727976),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.python.__BEH__on_eval__DOT__one,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"eval.one","eval.one",1173589382),null], null), null));

lt.plugins.python.__BEH__python_watch = (function __BEH__python_watch(editor,res){var temp__4092__auto__ = cljs.core.get.call(null,new cljs.core.Keyword(null,"watches","watches",2139868463).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,editor)),new cljs.core.Keyword(null,"id","id",1013907597).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res)));if(cljs.core.truth_(temp__4092__auto__))
{var watch = temp__4092__auto__;var str_result = new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(res);return lt.object.raise.call(null,new cljs.core.Keyword(null,"inline-result","inline-result",656479555).cljs$core$IFn$_invoke$arity$1(watch),new cljs.core.Keyword(null,"update!","update!",779473898),str_result);
} else
{return null;
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.python","python-watch","lt.plugins.python/python-watch",765439236),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.python.__BEH__python_watch,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.python.watch","editor.eval.python.watch",2701539968),null], null), null));

lt.plugins.python.__BEH__python_result = (function __BEH__python_result(editor,res){lt.objs.notifos.done_working.call(null);
return lt.object.raise.call(null,editor,new cljs.core.Keyword(null,"editor.result","editor.result",4030217008),new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(res),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"end","end",1014004813).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res)),new cljs.core.Keyword(null,"start-line","start-line",3689311729),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res))], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.python","python-result","lt.plugins.python/python-result",1017432756),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.python.__BEH__python_result,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.python.result","editor.eval.python.result",1651540272),null], null), null));

lt.plugins.python.__BEH__python_success = (function __BEH__python_success(editor,res){lt.objs.notifos.done_working.call(null);
return lt.object.raise.call(null,editor,new cljs.core.Keyword(null,"editor.result","editor.result",4030217008),"\u2713",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"end","end",1014004813).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res)),new cljs.core.Keyword(null,"start-line","start-line",3689311729),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res))], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.python","python-success","lt.plugins.python/python-success",1958082712),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.python.__BEH__python_success,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.python.success","editor.eval.python.success",636035572),null], null), null));

lt.plugins.python.__BEH__python_exception = (function __BEH__python_exception(editor,ex){lt.objs.notifos.done_working.call(null);
return lt.object.raise.call(null,editor,new cljs.core.Keyword(null,"editor.exception","editor.exception",3983021184),new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(ex),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"end","end",1014004813).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(ex)),new cljs.core.Keyword(null,"start-line","start-line",3689311729),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(ex))], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.python","python-exception","lt.plugins.python/python-exception",1767186692),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.python.__BEH__python_exception,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.python.exception","editor.eval.python.exception",3489795712),null], null), null));

lt.plugins.python.image = (function image(src){var e__7145__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img","img",1014008629),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"src","src",1014018390),[cljs.core.str("data:image/png;base64,"),cljs.core.str(src)].join('')], null)], null));var seq__7339_7361 = cljs.core.seq.call(null,cljs.core.partition.call(null,2,cljs.core.PersistentVector.EMPTY));var chunk__7340_7362 = null;var count__7341_7363 = 0;var i__7342_7364 = 0;while(true){
if((i__7342_7364 < count__7341_7363))
{var vec__7343_7365 = cljs.core._nth.call(null,chunk__7340_7362,i__7342_7364);var ev__7146__auto___7366 = cljs.core.nth.call(null,vec__7343_7365,0,null);var func__7147__auto___7367 = cljs.core.nth.call(null,vec__7343_7365,1,null);lt.util.dom.on.call(null,e__7145__auto__,ev__7146__auto___7366,func__7147__auto___7367);
{
var G__7368 = seq__7339_7361;
var G__7369 = chunk__7340_7362;
var G__7370 = count__7341_7363;
var G__7371 = (i__7342_7364 + 1);
seq__7339_7361 = G__7368;
chunk__7340_7362 = G__7369;
count__7341_7363 = G__7370;
i__7342_7364 = G__7371;
continue;
}
} else
{var temp__4092__auto___7372 = cljs.core.seq.call(null,seq__7339_7361);if(temp__4092__auto___7372)
{var seq__7339_7373__$1 = temp__4092__auto___7372;if(cljs.core.chunked_seq_QMARK_.call(null,seq__7339_7373__$1))
{var c__6528__auto___7374 = cljs.core.chunk_first.call(null,seq__7339_7373__$1);{
var G__7375 = cljs.core.chunk_rest.call(null,seq__7339_7373__$1);
var G__7376 = c__6528__auto___7374;
var G__7377 = cljs.core.count.call(null,c__6528__auto___7374);
var G__7378 = 0;
seq__7339_7361 = G__7375;
chunk__7340_7362 = G__7376;
count__7341_7363 = G__7377;
i__7342_7364 = G__7378;
continue;
}
} else
{var vec__7344_7379 = cljs.core.first.call(null,seq__7339_7373__$1);var ev__7146__auto___7380 = cljs.core.nth.call(null,vec__7344_7379,0,null);var func__7147__auto___7381 = cljs.core.nth.call(null,vec__7344_7379,1,null);lt.util.dom.on.call(null,e__7145__auto__,ev__7146__auto___7380,func__7147__auto___7381);
{
var G__7382 = cljs.core.next.call(null,seq__7339_7373__$1);
var G__7383 = null;
var G__7384 = 0;
var G__7385 = 0;
seq__7339_7361 = G__7382;
chunk__7340_7362 = G__7383;
count__7341_7363 = G__7384;
i__7342_7364 = G__7385;
continue;
}
}
} else
{}
}
break;
}
return e__7145__auto__;
});

lt.plugins.python.canvas = (function canvas(){var e__7145__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"canvas","canvas",3941165258)], null));var seq__7351_7386 = cljs.core.seq.call(null,cljs.core.partition.call(null,2,cljs.core.PersistentVector.EMPTY));var chunk__7352_7387 = null;var count__7353_7388 = 0;var i__7354_7389 = 0;while(true){
if((i__7354_7389 < count__7353_7388))
{var vec__7355_7390 = cljs.core._nth.call(null,chunk__7352_7387,i__7354_7389);var ev__7146__auto___7391 = cljs.core.nth.call(null,vec__7355_7390,0,null);var func__7147__auto___7392 = cljs.core.nth.call(null,vec__7355_7390,1,null);lt.util.dom.on.call(null,e__7145__auto__,ev__7146__auto___7391,func__7147__auto___7392);
{
var G__7393 = seq__7351_7386;
var G__7394 = chunk__7352_7387;
var G__7395 = count__7353_7388;
var G__7396 = (i__7354_7389 + 1);
seq__7351_7386 = G__7393;
chunk__7352_7387 = G__7394;
count__7353_7388 = G__7395;
i__7354_7389 = G__7396;
continue;
}
} else
{var temp__4092__auto___7397 = cljs.core.seq.call(null,seq__7351_7386);if(temp__4092__auto___7397)
{var seq__7351_7398__$1 = temp__4092__auto___7397;if(cljs.core.chunked_seq_QMARK_.call(null,seq__7351_7398__$1))
{var c__6528__auto___7399 = cljs.core.chunk_first.call(null,seq__7351_7398__$1);{
var G__7400 = cljs.core.chunk_rest.call(null,seq__7351_7398__$1);
var G__7401 = c__6528__auto___7399;
var G__7402 = cljs.core.count.call(null,c__6528__auto___7399);
var G__7403 = 0;
seq__7351_7386 = G__7400;
chunk__7352_7387 = G__7401;
count__7353_7388 = G__7402;
i__7354_7389 = G__7403;
continue;
}
} else
{var vec__7356_7404 = cljs.core.first.call(null,seq__7351_7398__$1);var ev__7146__auto___7405 = cljs.core.nth.call(null,vec__7356_7404,0,null);var func__7147__auto___7406 = cljs.core.nth.call(null,vec__7356_7404,1,null);lt.util.dom.on.call(null,e__7145__auto__,ev__7146__auto___7405,func__7147__auto___7406);
{
var G__7407 = cljs.core.next.call(null,seq__7351_7398__$1);
var G__7408 = null;
var G__7409 = 0;
var G__7410 = 0;
seq__7351_7386 = G__7407;
chunk__7352_7387 = G__7408;
count__7353_7388 = G__7409;
i__7354_7389 = G__7410;
continue;
}
}
} else
{}
}
break;
}
return e__7145__auto__;
});

lt.plugins.python.__BEH__python_image = (function __BEH__python_image(editor,img){return lt.object.raise.call(null,editor,new cljs.core.Keyword(null,"editor.result.underline","editor.result.underline",541343758),lt.plugins.python.image.call(null,new cljs.core.Keyword(null,"image","image",1114217677).cljs$core$IFn$_invoke$arity$1(img)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"end","end",1014004813).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(img)),new cljs.core.Keyword(null,"start-line","start-line",3689311729),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(img))], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.python","python-image","lt.plugins.python/python-image",769628592),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.python.__BEH__python_image,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.python.image","editor.eval.python.image",2688950028),null], null), null));

lt.plugins.python.__BEH__python_printer = (function __BEH__python_printer(editor,p){return lt.objs.console.loc_log.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"file","file",1017047278),lt.objs.files.basename.call(null,new cljs.core.Keyword(null,"file","file",1017047278).cljs$core$IFn$_invoke$arity$1(p)),new cljs.core.Keyword(null,"line","line",1017226086),"stdout",new cljs.core.Keyword(null,"content","content",1965434859),new cljs.core.Keyword(null,"msg","msg",1014012659).cljs$core$IFn$_invoke$arity$1(p)], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.python","python-printer","lt.plugins.python/python-printer",3525927087),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.python.__BEH__python_printer,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.python.print","editor.eval.python.print",2695571550),null], null), null));

lt.plugins.python.__BEH__eval_BANG_ = (function __BEH__eval_BANG_(this$,event){var map__7358 = event;var map__7358__$1 = ((cljs.core.seq_QMARK_.call(null,map__7358))?cljs.core.apply.call(null,cljs.core.hash_map,map__7358):map__7358);var origin = cljs.core.get.call(null,map__7358__$1,new cljs.core.Keyword(null,"origin","origin",4300251800));var info = cljs.core.get.call(null,map__7358__$1,new cljs.core.Keyword(null,"info","info",1017141280));var client = new cljs.core.Keyword(null,"default","default",2558708147).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"client","client",3951159101).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,origin)));lt.objs.notifos.working.call(null,"");
return lt.objs.clients.send.call(null,lt.objs.eval.get_client_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"editor.eval.python","editor.eval.python",2959445727),new cljs.core.Keyword(null,"origin","origin",4300251800),origin,new cljs.core.Keyword(null,"info","info",1017141280),info,new cljs.core.Keyword(null,"create","create",3956577390),lt.plugins.python.try_connect], null)),new cljs.core.Keyword(null,"editor.eval.python","editor.eval.python",2959445727),info,new cljs.core.Keyword(null,"only","only",1017320222),origin);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.python","eval!","lt.plugins.python/eval!",1599536011),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.python.__BEH__eval_BANG_,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"eval!","eval!",1110791799),null], null), null));

lt.plugins.python.pyzmq_warned = false;

lt.plugins.python.__BEH__pyzmq_error = (function __BEH__pyzmq_error(this$){if(cljs.core.truth_(lt.plugins.python.pyzmq_warned))
{return null;
} else
{lt.plugins.python.pyzmq_warned = true;
return lt.objs.popup.popup_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"header","header",4087600639),"Some IPython dependencies are missing.",new cljs.core.Keyword(null,"body","body",1016933652),"Looks like you have IPython installed, but you also need pyzmq in order for Light Table to take advantage of the IPython client. You can continue with the default client for a scaled down experience.",new cljs.core.Keyword(null,"buttons","buttons",1255256819),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1116631654),"Install instructions",new cljs.core.Keyword(null,"action","action",3885920680),(function (){return lt.objs.platform.open.call(null,"http://ipython.org/ipython-doc/stable/install/install.html");
})], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1116631654),"ok"], null)], null)], null));
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.python","pyzmq-error","lt.plugins.python/pyzmq-error",2234053558),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.python.__BEH__pyzmq_error,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"python.client.error.pyzmq","python.client.error.pyzmq",1746409904),null], null), null));

lt.plugins.python.__BEH__ipython_error = (function __BEH__ipython_error(this$){if(cljs.core.truth_(lt.plugins.python.pyzmq_warned))
{return null;
} else
{lt.plugins.python.pyzmq_warned = true;
return lt.objs.popup.popup_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"header","header",4087600639),"Light Table requires IPython 1.0+",new cljs.core.Keyword(null,"body","body",1016933652),"Looks like you have an older version of IPython installed. You can continue with the default client for a scaled down experience.",new cljs.core.Keyword(null,"buttons","buttons",1255256819),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1116631654),"Install instructions",new cljs.core.Keyword(null,"action","action",3885920680),(function (){return lt.objs.platform.open.call(null,"http://ipython.org/ipython-doc/stable/install/install.html");
})], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1116631654),"ok"], null)], null)], null));
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.python","ipython-error","lt.plugins.python/ipython-error",4569154854),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.python.__BEH__ipython_error,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"python.client.error.ipython-version","python.client.error.ipython-version",1225775883),null], null), null));

lt.plugins.python.__BEH__connect = (function __BEH__connect(this$,path){return lt.plugins.python.try_connect.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"info","info",1017141280),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"path","path",1017337751),path], null)], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.python","connect","lt.plugins.python/connect",2992978288),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.python.__BEH__connect,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"connect","connect",1965255772),null], null), null));

lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.plugins.python","python-lang","lt.plugins.python/python-lang",4398171301),new cljs.core.Keyword(null,"tags","tags",1017456523),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"python.lang","python.lang",3891509042),null], null), null));

lt.plugins.python.python = lt.object.create.call(null,new cljs.core.Keyword("lt.plugins.python","python-lang","lt.plugins.python/python-lang",4398171301));

lt.objs.sidebar.clients.add_connector.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1017277949),"Python",new cljs.core.Keyword(null,"desc","desc",1016984067),"Select a directory to serve as the root of your python project.",new cljs.core.Keyword(null,"connect","connect",1965255772),(function (){return lt.objs.dialogs.dir.call(null,lt.plugins.python.python,new cljs.core.Keyword(null,"connect","connect",1965255772));
})], null));

lt.plugins.python.__BEH__python_exe = (function __BEH__python_exe(this$,exe){return lt.object.merge_BANG_.call(null,lt.plugins.python.python,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"python-exe","python-exe",2215073043),exe], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.python","python-exe","lt.plugins.python/python-exe",2717972999),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.python.__BEH__python_exe,new cljs.core.Keyword(null,"desc","desc",1016984067),"Python: Set the path to the python executable for clients",new cljs.core.Keyword(null,"params","params",4313443576),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1116631654),"path",new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"path","path",1017337751)], null)], null),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",773332388),null], null), null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"user","user",1017503549),new cljs.core.Keyword(null,"exclusive","exclusive",2700522000),true);

lt.plugins.python.__BEH__ipython_exe = (function __BEH__ipython_exe(this$,exe){return lt.object.merge_BANG_.call(null,lt.plugins.python.python,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"ipython-exe","ipython-exe",2513741372),exe], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.python","ipython-exe","lt.plugins.python/ipython-exe",3560172368),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.python.__BEH__ipython_exe,new cljs.core.Keyword(null,"desc","desc",1016984067),"Python: Set the path to ipython for clients",new cljs.core.Keyword(null,"params","params",4313443576),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1116631654),"path",new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"path","path",1017337751)], null)], null),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",773332388),null], null), null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"user","user",1017503549),new cljs.core.Keyword(null,"exclusive","exclusive",2700522000),true);

}

//# sourceMappingURL=